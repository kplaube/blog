import { h } from "hastscript";
import { visit } from "unist-util-visit";

export default function myRehypeFigure(option) {
  const className = (option && option.className) || "rehype-figure"

  function buildFigure({ properties }) {
    const figure = h("figure", { class: className }, [
      h("img", { ...properties }),
      properties.title && properties.title.trim().length > 0
        ? h("figcaption", properties.title)
        : "",
    ])
    return figure
  }

  return function (tree) {
    visit(tree, { tagName: "p" }, (node, index) => {
      const images = node.children
        .filter((n) => n.tagName === "img")
        .map((img) => buildFigure(img))

      if (images.length === 0) return

      tree.children[index] =
        images.length === 1
          ? images[0]
          : (tree.children[index] = h(
              "div",
              { class: `${className}-container` },
              images
            ))
    })
  }
}
