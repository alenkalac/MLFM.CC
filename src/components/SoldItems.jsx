import { Show, createResource, For } from "solid-js"
import { useParams } from "solid-app-router"
import * as timeago from 'timeago.js';



export default function SoldItems() {

    const params = useParams();
    let format = Intl.NumberFormat();

    const [history] = createResource(() => params.id, async (itemId) => {
       return fetch(`http://localhost/api/v1/item/${itemId}/history`).then(d => d.json())
    });

    let sold = history();
    return <>
        <Show when={history()} >
            <div class="overflow-x-auto mt-5">
                <hr />
                <div class="mb-1 mt-3">Sale History</div>
                <div class="mt-1 mb-3">Avg: {format.format(history().avg)}</div>
                <table class="table w-full text-center">
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Stats</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                        <For each={history().items}>
                            {item => {
                                let si = item.stats == null ? [] : Object.entries(item.stats);
                                return <tr class="hover">
                                    <td>{timeago.format(item.timestamp.date)}</td>
                                    <td>
                                        {si && si.map(element => {
                                            if(element[0] == "id") return;
                                            return <div class="ml-2 mr-2">{element[0]}: {element[1]}</div>
                                        })}
                                    </td>
                                    <td>{format.format(item.price)}</td>
                                </tr>
                            }}
                        </For>
                        
                    </tbody>
                </table>
            </div>
            </Show>
    </>

}