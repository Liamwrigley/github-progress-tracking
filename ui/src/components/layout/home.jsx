export const Home = () => {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <h2>TODO</h2>
            </div>
            <div className="border-2 border-custom-highlight2 rounded p-2">
                <h2>Auth process</h2>
                <ul class="steps steps-vertical">
                    <li class="step">landing auth page (asks to connect with either github or discord)</li>
                    <li class="step">user page - shows details for whatever is linked</li>
                    <li class="step">connect discord</li>
                    <li class="step">
                        <ul class="steps steps-vertical">
                            <li class="step step-primary">connect github</li>
                            <li class="step">auth and save keys</li>
                            <li class="step">get repos and show all to select from</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}