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
                <p>Embarking on your coding journey and striving for consistent progress? We understand that building and maintaining a coding habit, especially as a newer developer, can be challenging.</p><p> With RepoRookie, it's all about maintaining your momentum. The app operates on a streak-based system, encouraging you to make progress daily, no matter how minor. To keep your streak alive, all you need to do is make at least one push to your tracked repository each day. It's a simple, yet powerful way to ensure you're taking steps forward in your developer journey.</p>
            </div>
            <div className="divider"></div>
            <div className="prose max-w-none text-left">
                <h2>{`>`} Why RepoRookie?</h2>

                <ul className="mr-auto list-none">
                    <li><strong>Build a Habit:</strong> Consistency is key when learning and growing as a developer. Our app aids in creating a daily coding routine.</li>
                    <li><strong>Stay Motivated:</strong> The satisfaction of keeping a streak alive is a powerful motivator. Celebrate your dedication and watch your progress stack up day by day.</li>
                    <li><strong>Focus on Progress:</strong> Whether it's a single line of code or a new feature, every push counts. Remember, it's about the journey, not just the destination.</li>
                </ul>
            </div>
            <div className="divider"></div>
            <div className="prose max-w-none text-left">
                <h2>{`>`} How it works</h2>

                <ul className="mr-auto list-none">
                    <li><strong>Sign Up:</strong> Create your account and link your GitHub and Discord.</li>
                    <li><strong>Choose Repos:</strong> Select the repositories you want to track and level up with.</li>
                    <li><strong>Code & Earn:</strong> Push code daily, maintain streaks, and unlock achievements.</li>
                    {/* <li><strong>Pick Your Path:</strong> Choose coding challenges and climb your personalized skill tree.</li> */}
                    {/* <li><strong>Compete & Collaborate:</strong> Check leaderboards, join community challenges, and collaborate on projects.</li> */}
                    <li><strong>Grow:</strong> Get insights, set goals, and celebrate every coding milestone with RepoRookie.</li>
                </ul>
            </div>
            <p>🚀 <strong>Ready to transform your coding journey? Dive into RepoRookie now!</strong></p>
        </div>
    )
}