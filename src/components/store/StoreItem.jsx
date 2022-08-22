import { Link } from "solid-app-router"


export default function StoreItem(props) {

    return <Link href={`/item/${props.item.id}`}>
        <div class="flex items-center p-1 mb-2 hover:bg-slate-500">
            <img class="mr-1" src={props.item.item_icon} />
            <span>{props.item.item_name}</span>
        </div>
    </Link>

}