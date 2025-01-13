
export interface EmptyStateComponentProps {
    title: string,
    description: string,
    icon: JSX.Element
}

export const EmptyStateComponent = ({icon, title, description}: EmptyStateComponentProps) => {
    return (
        <div className="min-h-96 py-8 w-full flex flex-col justify-center items-center empty-state">
            {icon}
            <h2>{title}</h2>
            <div>{description}</div>
        </div>
    )
}