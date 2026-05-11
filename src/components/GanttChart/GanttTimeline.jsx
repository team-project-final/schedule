import { BUSINESS_DAYS, TOTAL_BUSINESS_DAYS, DAY_WIDTH } from '../../utils/dateUtils'

const WEEK_STARTS = new Set([
  '2026-05-12', '2026-05-18', '2026-05-26', '2026-06-01', '2026-06-08', '2026-06-15',
])
const WEEK_LABEL = {
  '2026-05-12': 'W1',
  '2026-05-18': 'W2',
  '2026-05-26': 'W3',
  '2026-06-01': 'W4',
  '2026-06-08': 'W5',
  '2026-06-15': '6/15',
}
const PRESENTATION = '2026-06-15'
const DAY_NAMES = ['일','월','화','수','목','금','토']

// 다음 영업일 직전에 휴일이 있는 날짜들 (해당 day cell 좌측에 휴일 표시)
const HOLIDAY_BEFORE = {
  '2026-05-26': '5/25 부처님오신날',
  '2026-06-04': '6/3 지방선거',
}

export default function GanttTimeline() {
  return (
    <div
      className="flex relative"
      style={{
        width: TOTAL_BUSINESS_DAYS * DAY_WIDTH,
        background: 'var(--ink)',
        height: '48px',
      }}
    >
      {BUSINESS_DAYS.map((d, i) => {
        const iso = d.toISOString().split('T')[0]
        const isWeekStart = WEEK_STARTS.has(iso)
        const weekLabel = WEEK_LABEL[iso]
        const isPresentation = iso === PRESENTATION
        const isToday = iso === new Date().toISOString().split('T')[0]
        const holidayBefore = HOLIDAY_BEFORE[iso]

        return (
          <div
            key={i}
            className="flex-shrink-0 relative text-center"
            style={{
              width: DAY_WIDTH,
              borderRight: '1px solid rgba(244,238,220,0.15)',
              borderLeft: isWeekStart ? '1px solid var(--paper)' : 'none',
              background: isPresentation ? 'var(--oxblood)' : isToday ? 'rgba(244,238,220,0.12)' : 'transparent',
              paddingTop: '8px',
              boxShadow: holidayBefore
                ? 'inset 4px 0 0 0 var(--oxblood)'
                : 'none',
            }}
            title={holidayBefore ? `직전 휴일: ${holidayBefore}` : undefined}
          >
            {/* Week label stamp */}
            {weekLabel && (
              <span
                className="absolute font-display font-black tracking-wider"
                style={{
                  top: '-22px',
                  left: 0,
                  fontSize: '13px',
                  letterSpacing: '0.15em',
                  color: 'var(--ink)',
                  background: 'var(--paper)',
                  padding: '2px 6px',
                  border: '1px solid var(--ink)',
                  zIndex: 2,
                }}
              >
                {weekLabel}
              </span>
            )}
            <div
              className="font-mono"
              style={{
                fontSize: '10px',
                color: 'var(--paper)',
                letterSpacing: '0.05em',
                fontWeight: isWeekStart ? 600 : 400,
              }}
            >
              {String(d.getMonth() + 1).padStart(2, '0')}/{String(d.getDate()).padStart(2, '0')}
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: '8px',
                color: 'rgba(244,238,220,0.55)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              {isPresentation ? '발표' : DAY_NAMES[d.getDay()]}
            </div>
          </div>
        )
      })}
    </div>
  )
}
