interface IProps {
    children?:string
}

export const Error = ({children}:IProps) => {

    return <p className="error-message">{children}</p>
    
}