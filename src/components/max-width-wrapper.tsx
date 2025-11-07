import { ReactNode } from "react"

export default ({ children } : {
    children : ReactNode
}) => {
    return <>
        <div className="flex justify-center pt-15">
            <main className="w-full md:w-4/5 m-3">
                {children}
            </main>
        </div>
    </>
}