export const Stepper = ({ steps }) => {

    const activeStepClass = "border-custom-highlight "
    const completedStepClass = "border-custom-highlight bg-custom-highlight text-white "
    const baseClass = "border-custom-highlight border-2 p-2 w-full flex items-center justify-between space-x-3 "

    return (
        <div className="flex flex-row gap-4 justify-between">
            {steps.map((step, index) => {
                var classToAdd = baseClass + (
                    step.status === true ? completedStepClass
                        :
                        step.status === false ? activeStepClass : '')
                return (
                    <div key={index} className={classToAdd}>
                        <div>{`${index + 1}. ${step.text}`}</div>
                        {step.status === true ? <i className={`bi bi-check2-circle`}></i> : <i className={`bi bi-circle`}></i>}
                    </div>
                )

            })}
        </div>
    )
}