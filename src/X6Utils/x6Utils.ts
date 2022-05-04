import { Addon, Graph, Markup, Shape } from "@antv/x6"

export default class X6Utils {
  public static createGraph(container: any): Graph {
    return new Graph({
      container: container,
      grid: false,
      onEdgeLabelRendered: (args) => {
        const { edge, selectors } = args
        if(edge.getSourceCell()?.shape === "path"){
          const content = selectors.foContent as HTMLDivElement
          if (content) {
            const arrowLabel = document.createElement('textarea')
            arrowLabel.className = 'arrowLabel'
            arrowLabel.placeholder = 'Type something'
            arrowLabel.maxLength = 30
            content.appendChild(arrowLabel)
          }
        }
      },
      connecting: {
        router: {
          name: 'manhattan',
          args: {
            padding: 10,
          },
        },
        connector: {
          name: 'rounded',
          args: {
            radius: 20,
          },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
          radius: 30,
        },
        createEdge() {
          return new Shape.Edge({
            shape: 'custom-edge-label',
            defaultLabel: {
              markup: Markup.getForeignObjectMarkup(),
              attrs: {
                fo: {
                  width: 130,
                  height: 50,
                  x: -70,
                  y: -25,
                },
              },
            },
            label: {
              position: 0.5,
            },
            attrs: {
              line: {
                stroke: '#6C7FF9',
                sourceMarker: {
                  tagName: 'none',
                },
                targetMarker: {
                  tagName: 'none',
                }
              },
            },
            zIndex: 0,
          })
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        },
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#5F95FF',
              stroke: '#5F95FF',
            },
          },
        },
      },
      snapline: true,
      keyboard: true,
      clipboard: true,
    })
  }

  public static createStencil(graph: Graph) {
    return new Addon.Stencil({
      title: '',
      target: graph,
      stencilGraphWidth: 300,
      stencilGraphHeight: 200,
      collapsable: true,
      groups: [
        {
          title: 'Diagram',
          name: 'group1',
          graphHeight: 150,
          layoutOptions: {
            rowHeight: 120,
          },
        },
        {
          title: 'Node',
          name: 'group2',
          graphHeight: 250,
          layoutOptions: {
            rowHeight: 100,
          },
        },
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 290,
        rowHeight: 50,
      },
    })
  }
}