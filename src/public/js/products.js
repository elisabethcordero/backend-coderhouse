const socket = io();

socket.on("new_product", () => {
    location.reload()
});