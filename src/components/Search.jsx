import { For, Show } from "solid-js"
import { search, searches, openSearch, setOpenSearch } from "./SearchContext"
import StoreItem from "./store/StoreItem"
import { Link } from "solid-app-router"

export default function Search() {
    return <div>
        <div class={`z-[15] absolute bg-gray-600 opacity-40 top-0 bottom-0 left-0 right-0 ${openSearch() ? "block" : "hidden"}`} onClick={() => {setOpenSearch(false)}}></div> 
        <div class={`absolute p-2 bg-[#2a303c] z-20 top-13 right-14 w-[320px] h-[400px] flex-col overflow-y-scroll ${search().length > 3 && openSearch() ? "flex" : "hidden"}`}>
            <Show when={searches()}>
                <div class="p-2 bg-blue-500 text-white">Users</div>
                <For each={searches()['users']}>
                    {user => {
                        return <div>
                                <Link href={`/owner/${user['owner']}`}><div class="p-2 hover:bg-slate-500 cursor-pointer">{user['owner']}</div></Link> 
                            </div>
                    }}
                        
                </For>
                <div class="p-2 bg-blue-500 text-white">Items</div>
                <For each={searches()['items']}>
                    {item => {
                        return <div> <StoreItem item={item} /> </div>
                    }}
                        
                </For>
            </Show>
        </div>
    </div>
        

}