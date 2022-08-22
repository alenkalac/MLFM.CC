import { Show, createResource, For } from "solid-js"
import { useParams } from "solid-app-router"
import { Link } from "solid-app-router";

export default function AvailableItems() {

    const params = useParams();
    let format = Intl.NumberFormat();

    const [products] = createResource(() => params.id, async (itemId) => {
        return fetch(`http://localhost/api/v1/product/${itemId}/listings`).then(d => d.json())
    });

    function copyToClip(val) {
        navigator.clipboard.writeText(val)
    }

    return <>
        <Show when={products()}>
            <div class="overflow-x-auto">
                <table class="table w-full text-center">
                    <thead>
                    <tr>
                        <th>Price</th>
                        <th>Stats</th>
                        <th>Store Location</th>
                        <th>Store Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={4} class="cursor-pointer italic" onClick={() => {
                            copyToClip(products()['items'][0].price - 1);
                        }}>Your Item here! Click to copy price of 
                            <span class="font-bold">
                                {format.format(products()['items'][0] != null ? products()['items'][0].price - 1 : 1)}
                            </span>
                        </td>
                        
                    </tr>
                    <For each={products()['items']}>
                        {item => {
                            let si = item.stats == null ? [] : Object.entries(item.stats);
                            return <tr class="hover">
                                        <td><span class="cursor-pointer" onClick={(e) => {
                                            let val = e.currentTarget.innerHTML.replaceAll(",", "");
                                            copyToClip(val);
                                        }}>{format.format(item.price)}</span> ({item.quantity})</td>
                                        
                                        <td>
                                            {si && si.map(element => {
                                                if(element[0] == "id") return;
                                                return <div class="ml-2 mr-2">{element[0]}: {element[1]}</div>
                                            })}
                                        </td>

                                        <td>ch:{item.store.location.c} fm:{item.store.location.r}</td>
                                        
                                        <td class="cursor-pointer">
                                            <Link href={`/owner/${item.store.owner}`}>
                                                <div class="font-bold">{item.store.owner}</div>
                                                <div>{item.store.store_title}</div>
                                            </Link>
                                        </td>
                                    </tr>
                            
                        }}
                    </For>
                    </tbody>
                </table>
            </div>
        </Show>
    </>;

}