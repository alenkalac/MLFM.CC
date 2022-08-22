
export default function ItemJob(props) {

    return <>
        <div class={`text-sm ${props.active ? "text-gray-100" : "text-gray-500"} pl-2 pr-2`}>
            {props.job}
        </div>
    </>

}