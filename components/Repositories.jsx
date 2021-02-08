import {useRouter} from 'next/router'
import css from 'styled-jsx/css'
// formatDistance: 두 날짜 간의 차이를 리턴하여 주고 addSuffix를 붙여주면 a day ago형식으로 표현해준다.
import formatDistance from 'date-fns/formatDistance'
import Link from 'next/link'

const style = css`
    .repos-wrapper {width: 100%; height: 100vh; overflow: scroll; padding: 0px 16px;}
    .repos-header {padding: 16px 0; font-size: 14px; font-weight: 600; border-bottom: 1px solid #ele4e8;}
    .repos-count {display: inline-block; padding: 2px 5px; margin-left: 6px; font-size: 12px; font-weight: 600; line-height: 1; color: #586069; background-color: rgba(27, 31, 35, 0.08); border-radius: 20px;}
    .repository-wrapper { width: 100%;border-bottom: 1px solid #ele4e8; padding: 24px 0;}
    .repository-description {padding: 12px 0;}
    a {text-decoration: none;}
    .repositoory-name {margin: 0; color: #0366d6; font-size: 20px; display: inline-block; cursor: pointer;}
    .repository-name:hover {text-decoration: underline;}
    .repository-description {margin: 0; font-size: 14px;}
    .repository-language {margin: 0; font-size: 14px;}
    .repository-updated-at {margin-left: 20px;}
    .repository-pagination {border: 1px solid rgba(27, 31, 35, 0.15); border-radius: 3px; width: fit-content; margin: auto; margin-top: 20px;}
    .repository-pagination button {padding: 6px 12px; font-size: 14px; border: 0; color: #0366d6; font-weight: bold; cursor: pointer; outline: none;}
    .repository-pagination button:first-child {border-right: 1px solid rgba(27, 31, 35, 0.15);}
    .repository-pagination button:hover:not([disabled]) {background-color: #0366d6; color: white;}
    .repository-pagination button:disabled {color: rgba(27, 31, 35, 0.3);}
`

const Repositories = ({repos, user}) => {
    const router = useRouter()
    const {page = '1'} = router.query
    if(!user || !repos) {
        return null
    }

    return (
        <div className="repos-wrapper">
            <div className="repos-header">
                Repositories
                <span className="repos-count">{user.public_repos}</span>
            </div>
            {user && repos && repos.map((repo) => (
            <div className="repository-wrapper" key={repo.id}>
                <a 
                    target="_blank"
                    href={`https://github.com/${user.login}/${repo.name}`}
                    rel="noreferrer"
                >
                    <h2 className="repository-name">{repo.name}</h2>
                </a>
                <p className="repository-description">{repo.description}</p>
                <p className="repository-language">
                    {repo.language}
                    <span className="repository-updated-at">
                        {formatDistance(new Date(repo.updated_at), new Date(), {addSuffix: true})}
                    </span>
                </p>
            </div>
            ))}
            <div className="repository-pagination">
                <Link href={`/users/${user.login}?page=${Number(page) - 1}`}>
                    <a>
                        <button type='button' disabled={page && page === '1'}>
                            Previous
                        </button>
                    </a>
                </Link>
                <Link href={`/users/${user.login}?page=${!page ? '2' : Number(page) + 1}`}>
                    <a>
                        <button type='button' disabled={repos.length < 10}>
                            Next
                        </button>
                    </a>
                </Link>
            </div>
            <style jsx>{style}</style>
        </div>
    );
}

export default Repositories
