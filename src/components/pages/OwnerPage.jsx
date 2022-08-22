import { useParams } from "solid-app-router"
import { createResource, Show, createSignal } from "solid-js";
import RecentItem from "../store/RecentItem";

export default function OwnerPage() {

    const params = useParams();
    let format = Intl.NumberFormat();

    const [ownerResource] = createResource(() => params.owner, async (owner) => {
        return fetch(`http://localhost/api/v1/store/owner/${owner}`).then(d => d.json())
    });

    const [storeVal, setStoreVal] = createSignal(0);

    return <>
        <div class="container mx-auto">
            <div class="grid md:grid-cols-[30%_70%] grid-cols-1 w-full h-64">
                <div class="text-center font-bold mt-5">
                </div>
                <div>
                    <Show when={ownerResource()}>
                        <div class="text-xl">
                            {ownerResource().owner.owner}'s Store
                        </div>
                        <div>Location: Ch:{ownerResource().owner.location.c} Room:{ownerResource().owner.location.r}</div>
                        <div>Estimated Store Value: <span class="font-bold">{format.format(storeVal())}</span></div>

                        <div class="flex flex-wrap gap-2 justify-center mt-5">
                            <For each={ownerResource().items}>
                                {item => {
                                    setStoreVal(storeVal() + (item.price * item.quantity));
                                    return <RecentItem item={item}/>
                                }}
                            </For>
                        </div>
                    </Show>
                </div>
            </div>
        </div>
    </>

}