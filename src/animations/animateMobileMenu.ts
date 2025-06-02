export const animateMobileMenu = (
   el: HTMLElement | null,
   routerAction?: () => void,
) => {
   if (!el) return;
   if (el.classList.contains("opacity-0")) el.classList.remove("opacity-y-0");

   el.classList.toggle("-translate-y-[120%]");

   if (routerAction) {
      routerAction();
   }
};
