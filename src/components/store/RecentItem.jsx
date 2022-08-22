
import { Link } from "solid-app-router";
import { createResource, Show } from "solid-js";

export default function RecentItem(props) {
    let format = Intl.NumberFormat();

    const [itemResource] = createResource(() => props.item.id, async (itemId) => {
        return fetch(`http://localhost/api/v1/item/${itemId}/history`).then(d => d.json());
    });

    return <Link href={`/item/${props.item.id}`}>
            <div class="shadow-lg rounded-2xl w-80 p-4 bg-sky-200 relative overflow-hidden min-w-[256px] min-h-[150px] hover:scale-95 transition-all">
                <img alt="moto" src={props.item.item.item_icon + "?resize=2"} class="absolute -right-11 -bottom-8 h-40 w-40 mb-4"/>
                <div class="w-4/6">
                    <p class="text-gray-800 text-sm font-medium mb-2">
                        {props.item.quantity}x {props.item.item.item_name}
                    </p>

                    <Show when={itemResource()}>
                    <p class="text-red-800 text-sm font-medium absolute bottom-8">
                        Avg: {format.format(itemResource().avg)}
                    </p>
                    </Show>
                    
                    <p class="text-indigo-800 text-sm font-medium absolute bottom-2">
                        Price: {format.format(props.item.price)}
                    </p>
                </div>
            </div>
        </Link>;
}