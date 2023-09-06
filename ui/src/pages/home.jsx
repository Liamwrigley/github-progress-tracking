export const Home = () => {

    return (
        <div className="flex flex-col gap-8">
            <div className="flex align-center justify-center">

                <pre className="prose leading-3 hidden sm:hidden md:block">
                    RRRR   EEEEE  PPPP    OOO   RRRR    OOO    OOO   K  K  III  EEEEE<br />
                    R   R  E      P   P  O   O  R   R  O   O  O   O  K K    I   E<br />
                    RRRR   EEEE   PPPP   O   O  RRRR   O   O  O   O  KK     I   EEEE<br />
                    R  R   E      P      O   O  R  R   O   O  O   O  K K    I   E<br />
                    R   R  EEEEE  P       OOO   R   R   OOO    OOO   K  K  III  EEEEE<br />
                </pre>
            </div>
            <div className="divider hidden sm:hidden md:flex"></div>
            <div className="prose max-w-none text-left">
                <h2 className="sm:block md:hidden">{`>`} RepoRookie 🚀</h2>
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
        </div>
    )
}