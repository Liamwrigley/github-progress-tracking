export const Home = () => {

    console.log(process.env.REACT_APP_API_URL)
    return (
        <div className="flex flex-col gap-8">
            <div className="prose max-w-none text-left">
                <h2>{`>`} RepoRookie 🚀</h2>
                <p>Embark on your coding adventure with RepoRookie! Dive into a gamified journey, track your progress, and transform every commit into a milestone. Are you ready to level up your coding game? Join the RepoRookie revolution now!</p>
            </div>
            <div className="divider"></div>
            <div className="prose max-w-none text-left">
                <h2>{`>`} How it works</h2>

                <ul className="mr-auto list-none">
                    <li><strong>Sign Up:</strong> Create your account and link your GitHub and Discord.</li>
                    <li><strong>Choose Repos:</strong> Select the repositories you want to track and level up with.</li>
                    <li><strong>Code & Earn:</strong> Push code daily, maintain streaks, and unlock achievements.</li>
                    <li><strong>Pick Your Path:</strong> Choose coding challenges and climb your personalized skill tree.</li>
                    <li><strong>Compete & Collaborate:</strong> Check leaderboards, join community challenges, and collaborate on projects.</li>
                    <li><strong>Grow:</strong> Get insights, set goals, and celebrate every coding milestone with RepoRookie.</li>
                </ul>
            </div>
            <p>🚀 <strong>Ready to transform your coding journey? Dive into RepoRookie now!</strong></p>
            <div className="divider"></div>
            <div className="prose max-w-none text-left">
                <h2>{`>`} TODO</h2>
                <ul className="mr-auto list-none divide-y divide-slate-600/25">
                    <li>
                        <div className="flex flex-row items-center  gap-4">
                            <input type="checkbox" checked="" className="checkbox" />
                            <p>Improve auth flow's UX. Dont automatically redirect</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-row items-center  gap-4">
                            <input type="checkbox" checked="" className="checkbox" />
                            <p>Show which repo is being pushed to on realtime events. Maybe include commit message?</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-row items-center  gap-4">
                            <input type="checkbox" checked="" className="checkbox" />
                            <p>Badges for milestones</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-row items-top  gap-4">
                            <input type="checkbox" checked="" className="checkbox" />
                            <div>
                                <h4 className="mt-0">View / Edit User Page</h4>
                                <p> - introduction / objectives</p>
                                <p> - current stats</p>
                                <p> - Swap / add / remove repo</p>
                                <p> - set goals</p>
                                <p> - showcase?</p>
                                <p> - language %'s</p>
                                <p> note: a lot of things become hard if I allow private repo's to be tracked. I'd have to re-auth to update info</p>

                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-row items-center  gap-4">
                            <input type="checkbox" checked="" className="checkbox" />
                            <p>Site suggestions</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-row items-center  gap-4">
                            <input type="checkbox" checked="" className="checkbox" />
                            <p>Leaderboard sorting / ordering</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-row items-top  gap-4">
                            <input type="checkbox" checked="" className="checkbox" />
                            <div>
                                <h4 className="mt-0">Additional data to save</h4>
                                <p> - if repo is public or private</p>
                                <p> - language % of repo (cant update unless public repo or when user logs in)</p>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}