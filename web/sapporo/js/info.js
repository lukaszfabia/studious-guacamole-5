/* jshint esversion: 6 */
function printInfo() {
    console.log("=== Images ===");
    const images = document.images;
    console.log("All images:", images);
    console.log("First image (item):", images.item(0));
    console.log("Image by name:", images.namedItem("main-img-id"));

    console.log("\n=== Links ===");
    const links = document.links;
    console.log("All links:", links);
    console.log("First link (item):", links.item(0));
    console.log("Link by name:", links.namedItem("lukasz's website"));

    console.log("\n=== Anchors ===");
    const anchors = document.anchors; // przestarzałe lol
    console.log("All anchors:", anchors);
    console.log("First anchor (item):", anchors.item(0));
    console.log("Anchor by name:", anchors.namedItem("lukasz's website"));

    console.log("\n=== Forms ===");
    const forms = document.forms;
    console.log("All forms:", forms);
    console.log("First form (item):", forms.item(0));
    console.log("Form by name:", forms.namedItem("contatctWithUs"));
}