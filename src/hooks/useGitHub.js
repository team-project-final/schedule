const REPO_OWNER = 'team-project-final'
const REPO_NAME = 'schedule'
const FILE_PATH = 'src/data/tasks.json'

export function useGitHub() {
  async function commitTasksUpdate(tasks, message) {
    const token = sessionStorage.getItem('gh_token')
    if (!token) throw new Error('로그인이 필요합니다')

    const fileRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const fileData = await fileRes.json()
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(tasks, null, 2))))

    const updateRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, content, sha: fileData.sha, branch: 'main' }),
      }
    )
    if (!updateRes.ok) throw new Error('커밋 실패')
    return updateRes.json()
  }

  return { commitTasksUpdate }
}
