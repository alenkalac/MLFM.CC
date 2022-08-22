import { createResource, For } from "solid-js";
import { Link } from "solid-app-router";
import RecentItem from "./store/RecentItem";


export default function RecentlyAdded () {


    const [items] = createResource(async () => {
        return fetch("http://localhost/api/v1/recent").then(d => d.json())
    });

    return <>
    <div><h2 class="flex justify-center text-2xl font-bold m-2">RECENT FINDS</h2></div>
    <div class="flex flex-wrap gap-2 justify-center">
        
        <For each={items()}>
            {item => {
               return <RecentItem item={item} />
            }}
        </For>
    </div>
    </>

};