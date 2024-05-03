export default function changeLove(condition: boolean, id: number): void {

    const element: HTMLElement= (document.getElementById(`like__element_${id}`) as HTMLElement); // Type assertion to HTMLElement
    const pElement: HTMLElement = (element.parentElement?.querySelector('p span') as HTMLElement); // Add null check for element.parentElement
    // const condition = element?.classList.contains("bg__red");
    if (condition) {
        element?.setAttribute("fill", "red");
        element?.setAttribute("stroke", "red");
        pElement.innerHTML = `${pElement.innerHTML == "" ? 1 : parseInt(pElement.innerHTML) + 1}`;
        return;
    }
    element?.setAttribute("fill", "none");
    element?.setAttribute("stroke", "currentColor");
    pElement.innerHTML = `${parseInt(pElement.innerHTML) - 1 == 0 ? "" : parseInt(pElement.innerHTML) - 1}`;
}
