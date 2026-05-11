#!/usr/bin/env node

/**
 * MD → JSON 동기화 스크립트
 *
 * documents 레포의 프로젝트 관리 문서(60개 MD)를 파싱하여
 * schedule 앱용 JSON 데이터(members.json, tasks.json, schedule.json)를 생성한다.
 *
 * 사용법:
 *   node scripts/sync-from-md.js --input <project-management-dir> --output <data-dir>
 *
 * 예시:
 *   node scripts/sync-from-md.js \
 *     --input ../documents/docs/project-management \
 *     --output src/data
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join, basename } from 'path'

// ─── CLI 인자 파싱 ────────────────────────────────────────
const args = process.argv.slice(2)
const inputIdx = args.indexOf('--input')
const outputIdx = args.indexOf('--output')

if (inputIdx === -1 || outputIdx === -1) {
  console.error('Usage: node sync-from-md.js --input <project-management-dir> --output <data-dir>')
  process.exit(1)
}

const INPUT_DIR = args[inputIdx + 1]
const OUTPUT_DIR = args[outputIdx + 1]

if (!existsSync(INPUT_DIR)) {
  console.error(`Input directory not found: ${INPUT_DIR}`)
  process.exit(1)
}

// ─── 유틸리티 ─────────────────────────────────────────────
function readMd(dir, filename) {
  const path = join(INPUT_DIR, dir, filename)
  if (!existsSync(path)) return null
  return readFileSync(path, 'utf-8')
}

function listMdFiles(subdir) {
  const dir = join(INPUT_DIR, subdir)
  if (!existsSync(dir)) return []
  return readdirSync(dir).filter(f => f.endsWith('.md'))
}

function extractBetween(text, startMarker, endMarker) {
  const startIdx = text.indexOf(startMarker)
  if (startIdx === -1) return ''
  const afterStart = startIdx + startMarker.length
  const endIdx = endMarker ? text.indexOf(endMarker, afterStart) : text.length
  return text.slice(afterStart, endIdx === -1 ? text.length : endIdx).trim()
}

// ─── SCOPE → members.json ─────────────────────────────────
function parseMembers() {
  const files = listMdFiles('scope')
  const members = []

  for (const file of files) {
    const content = readMd('scope', file)
    if (!content) continue

    // ID from filename: SCOPE_team-lead.md → team-lead
    const id = basename(file, '.md').replace('SCOPE_', '')

    // Handle: 첫 번째 테이블에서 Handle 행 추출
    const handleMatch = content.match(/\|\s*Handle\s*\|\s*(.+?)\s*\|/)
    const handle = handleMatch ? handleMatch[1].trim() : `@${id}`

    // 역할
    const roleMatch = content.match(/\|\s*역할\s*\|\s*(.+?)\s*\|/)
    const role = roleMatch ? roleMatch[1].trim() : ''

    // 담당 서비스
    const serviceMatch = content.match(/\|\s*담당 서비스\s*\|\s*(.+?)\s*\|/)
    const service = serviceMatch ? serviceMatch[1].trim() : ''

    // 담당 모듈
    const moduleMatch = content.match(/\|\s*담당 (?:모듈|영역)\s*\|\s*(.+?)\s*\|/)
    const modulesStr = moduleMatch ? moduleMatch[1].trim() : ''
    const modules = modulesStr.split(',').map(m => m.trim()).filter(Boolean)

    // 트랙 추출
    let track = '—'
    if (role.includes('트랙 A')) track = 'A'
    else if (role.includes('트랙 B')) track = 'B'
    else if (role.includes('트랙 C-1')) track = 'C'
    else if (role.includes('트랙 C-2')) track = 'C'
    else if (role.includes('트랙 D-1')) track = 'D'
    else if (role.includes('트랙 D-2')) track = 'D'

    members.push({
      id,
      handle,
      name: null,
      role,
      track,
      service,
      modules,
      avatar: null,
    })
  }

  // frontend가 SCOPE에 없으면 추가
  if (!members.find(m => m.id === 'frontend')) {
    members.push({
      id: 'frontend',
      handle: '@frontend',
      name: null,
      role: '전체 협업',
      track: '—',
      service: 'synapse-frontend',
      modules: ['Flutter UI'],
      avatar: null,
    })
  }

  return members
}

// ─── TASK → tasks.json ────────────────────────────────────
function parseTasks() {
  const files = listMdFiles('task')
  const tasks = []

  for (const file of files) {
    const content = readMd('task', file)
    if (!content) continue

    const memberId = basename(file, '.md').replace('TASK_', '')

    // Step 블록 분리: ## Step N: 또는 ## Step N — 로 시작
    const stepBlocks = content.split(/^## Step \d+/m).slice(1)
    const stepHeaders = [...content.matchAll(/^## Step (\d+)[:\s—\-]+(.+)$/gm)]

    for (let i = 0; i < stepBlocks.length; i++) {
      const block = stepBlocks[i]
      const stepNumber = stepHeaders[i] ? parseInt(stepHeaders[i][1]) : i + 1
      const rawName = stepHeaders[i] ? stepHeaders[i][2].trim() : `Step ${stepNumber}`
      // 이름에서 마크다운 볼드/이탤릭 제거
      const name = rawName.replace(/\*\*/g, '').replace(/\*/g, '').trim()

      // Step Goal
      const goalMatch = block.match(/\*\*Step Goal\*\*[:\s]*(.+?)(?:\n|$)/)
      const goal = goalMatch ? goalMatch[1].trim() : ''

      // Status
      let status = 'not_started'
      if (block.includes('[x] Done') || block.includes('[x] In Progress') === false && block.includes('[x] Done')) {
        status = 'done'
      } else if (block.includes('[x] In Progress')) {
        status = 'in_progress'
      }

      // Duration
      const durationMatch = block.match(/\*\*Duration\*\*[:\s]*([0-9.]+)\s*일/)
      const durationDays = durationMatch ? parseFloat(durationMatch[1]) : 1

      // Priority
      const priorityMatch = block.match(/priority[:\s]*["']?(P[012])["']?/i) ||
                            block.match(/우선순위[:\s]*["']?(P[012])["']?/i)
      const priority = priorityMatch ? priorityMatch[1] : 'P0'

      // Week — ## W{N} 헤더 또는 주차 정보 추출
      let week = 'W1'
      // 역방향으로 이 Step 위의 ## W{N} 헤더 찾기
      const beforeStep = content.split(`## Step ${stepNumber}`)[0] || ''
      const weekMatches = [...beforeStep.matchAll(/^## W(\d)/gm)]
      if (weekMatches.length > 0) {
        week = `W${weekMatches[weekMatches.length - 1][1]}`
      } else if (stepNumber <= 3) {
        week = 'W1'
      } else if (stepNumber <= 6) {
        week = 'W2'
      } else if (stepNumber <= 9) {
        week = 'W3'
      } else {
        week = 'W4'
      }

      // Planned dates 계산 (주차 기반)
      const weekStarts = { W1: '2026-05-12', W2: '2026-05-19', W3: '2026-05-26', W4: '2026-06-02' }
      const weekEnds = { W1: '2026-05-16', W2: '2026-05-23', W3: '2026-05-30', W4: '2026-06-06' }
      const plannedStart = weekStarts[week] || '2026-05-12'
      const plannedEnd = weekEnds[week] || '2026-05-16'

      // Assignee
      const assigneeMatch = block.match(/\*\*Assignee\*\*[:\s]*(.+?)(?:\n|$)/)
      const assignee = assigneeMatch ? assigneeMatch[1].trim() : `@${memberId}`

      tasks.push({
        id: `${memberId}-${stepNumber}`,
        memberId,
        week,
        stepNumber,
        name,
        goal,
        status,
        startDate: null,
        endDate: null,
        durationDays,
        plannedStart,
        plannedEnd,
        priority,
        comments: [],
        dependencies: [],
      })
    }
  }

  // 주차 내에서 plannedStart/End를 duration 기반으로 순차 배치
  const memberIds = [...new Set(tasks.map(t => t.memberId))]
  for (const mid of memberIds) {
    const memberTasks = tasks.filter(t => t.memberId === mid)
    const weeks = [...new Set(memberTasks.map(t => t.week))].sort()

    for (const week of weeks) {
      const weekTasks = memberTasks.filter(t => t.week === week).sort((a, b) => a.stepNumber - b.stepNumber)
      const weekStarts = { W1: '2026-05-12', W2: '2026-05-19', W3: '2026-05-26', W4: '2026-06-02' }
      let cursor = new Date(weekStarts[week])

      // 주말/공휴일 건너뛰기
      const HOLIDAYS = new Set(['2026-05-25', '2026-06-03'])
      function nextBusinessDay(d) {
        while (d.getDay() === 0 || d.getDay() === 6 || HOLIDAYS.has(d.toISOString().split('T')[0])) {
          d.setDate(d.getDate() + 1)
        }
        return d
      }

      function addBusinessDays(start, days) {
        const d = new Date(start)
        let count = 0
        while (count < Math.ceil(days) - 1) {
          d.setDate(d.getDate() + 1)
          if (d.getDay() !== 0 && d.getDay() !== 6 && !HOLIDAYS.has(d.toISOString().split('T')[0])) {
            count++
          }
        }
        return d
      }

      for (const task of weekTasks) {
        cursor = nextBusinessDay(cursor)
        task.plannedStart = cursor.toISOString().split('T')[0]
        const end = addBusinessDays(cursor, task.durationDays)
        task.plannedEnd = end.toISOString().split('T')[0]
        // 다음 task는 이 task 끝난 다음 영업일부터
        cursor = new Date(end)
        cursor.setDate(cursor.getDate() + 1)
      }
    }
  }

  return tasks
}

// ─── PRD → schedule.json ──────────────────────────────────
function parseSchedule() {
  const files = listMdFiles('prd').sort()
  const weeks = []

  for (const file of files) {
    const content = readMd('prd', file)
    if (!content) continue

    // Week ID from filename: PRD_W1.md → W1
    const weekMatch = basename(file, '.md').match(/W(\d)/)
    if (!weekMatch) continue
    const id = `W${weekMatch[1]}`

    // 주차 이름: # PRD: Week N — {name}
    const titleMatch = content.match(/^# PRD:\s*Week \d+\s*[—\-]+\s*(.+)$/m)
    const name = titleMatch ? titleMatch[1].trim() : `Week ${weekMatch[1]}`

    // 기간
    const dateMatch = content.match(/기간\s*\|\s*(\d{4}-\d{2}-\d{2})\s*.+?~\s*(\d{4}-\d{2}-\d{2})/)
    const startDate = dateMatch ? dateMatch[1] : null
    const endDate = dateMatch ? dateMatch[2] : null

    // 목표
    const goalMatch = content.match(/목표\s*\|\s*(.+?)\s*\|/)
    const goalsStr = goalMatch ? goalMatch[1] : ''
    const goals = goalsStr.split(',').map(g => g.trim()).filter(Boolean)

    // 성공 기준: "## 5. 성공 기준" 또는 체크리스트
    const criteriaSection = extractBetween(content, '성공 기준', '## 6')
    const criteriaLines = criteriaSection.match(/- \[[ x]\]\s*(.+)/g) || []
    const successCriteria = criteriaLines.map(line => {
      const checked = line.includes('[x]')
      const text = line.replace(/- \[[ x]\]\s*/, '').trim()
      return { text, checked }
    })

    weeks.push({ id, name, startDate, endDate, goals, successCriteria })
  }

  return { weeks }
}

// ─── HISTORY → tasks 상태 업데이트 ─────────────────────────
function applyHistory(tasks) {
  const files = listMdFiles('history')

  for (const file of files) {
    const content = readMd('history', file)
    if (!content) continue

    const memberId = basename(file, '.md').replace('HISTORY_', '')

    // 대시보드 테이블에서 상태 추출
    const tableRows = content.match(/\|\s*Step \d+\s*\|.+\|.+\|.+\|.+\|.+\|/g) || []
    for (const row of tableRows) {
      const cols = row.split('|').map(c => c.trim()).filter(Boolean)
      // cols: [Step N, 내용, 상태, 시작일, 완료일, 비고]
      if (cols.length < 5) continue

      const stepMatch = cols[0].match(/Step (\d+)/)
      if (!stepMatch) continue
      const stepNumber = parseInt(stepMatch[1])

      const statusText = cols[2].toLowerCase()
      let status = 'not_started'
      if (statusText.includes('done') || statusText.includes('완료')) status = 'done'
      else if (statusText.includes('progress') || statusText.includes('진행')) status = 'in_progress'

      const startDate = cols[3] !== '—' && cols[3] !== '' ? normalizeDate(cols[3]) : null
      const endDate = cols[4] !== '—' && cols[4] !== '' ? normalizeDate(cols[4]) : null

      // 해당 task 찾아서 업데이트
      const task = tasks.find(t => t.memberId === memberId && t.stepNumber === stepNumber)
      if (task) {
        task.status = status
        if (startDate) task.startDate = startDate
        if (endDate) task.endDate = endDate
      }
    }
  }

  return tasks
}

function normalizeDate(dateStr) {
  // "05-12" → "2026-05-12", "2026-05-12" → 그대로
  if (!dateStr || dateStr === '—') return null
  const trimmed = dateStr.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed
  if (/^\d{2}-\d{2}$/.test(trimmed)) return `2026-${trimmed}`
  return null
}

// ─── 실행 ─────────────────────────────────────────────────
console.log(`📂 Input:  ${INPUT_DIR}`)
console.log(`📂 Output: ${OUTPUT_DIR}`)
console.log('')

// 1. Members
const members = parseMembers()
console.log(`👥 Members: ${members.length}명 파싱 완료`)
for (const m of members) {
  console.log(`   - ${m.id}: ${m.handle} (${m.role})`)
}

// 2. Tasks
let tasks = parseTasks()
console.log(`\n📋 Tasks: ${tasks.length}개 Step 파싱 완료`)
const weekCounts = {}
for (const t of tasks) {
  weekCounts[t.week] = (weekCounts[t.week] || 0) + 1
}
for (const [week, count] of Object.entries(weekCounts).sort()) {
  console.log(`   - ${week}: ${count} steps`)
}

// 3. History → tasks 상태 반영
tasks = applyHistory(tasks)
const statusCounts = {}
for (const t of tasks) {
  statusCounts[t.status] = (statusCounts[t.status] || 0) + 1
}
console.log(`\n📊 Status: ${JSON.stringify(statusCounts)}`)

// 4. Schedule
const schedule = parseSchedule()
console.log(`\n📅 Schedule: ${schedule.weeks.length}주차 파싱 완료`)
for (const w of schedule.weeks) {
  console.log(`   - ${w.id}: ${w.name} (${w.startDate} ~ ${w.endDate})`)
}

// 5. 출력
writeFileSync(join(OUTPUT_DIR, 'members.json'), JSON.stringify(members, null, 2))
writeFileSync(join(OUTPUT_DIR, 'tasks.json'), JSON.stringify(tasks, null, 2))
writeFileSync(join(OUTPUT_DIR, 'schedule.json'), JSON.stringify(schedule, null, 2))

console.log(`\n✅ 동기화 완료!`)
console.log(`   - ${join(OUTPUT_DIR, 'members.json')}`)
console.log(`   - ${join(OUTPUT_DIR, 'tasks.json')}`)
console.log(`   - ${join(OUTPUT_DIR, 'schedule.json')}`)
