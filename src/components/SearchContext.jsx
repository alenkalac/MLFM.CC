import { createResource, createSignal } from "solid-js";


export const [search, setSearch] = createSignal(false);
export const [openSearch, setOpenSearch] = createSignal(false);

export const [searches, { mutate, refetch }] = createResource(search, async (data) => {
    if(data.length < 3) return;
    return (await fetch(`http://localhost/api/v1/search?q=${data}`)).json()
})
