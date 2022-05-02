import { Component, OnInit } from '@angular/core';
import { Addon, Graph, Markup, Shape } from '@antv/x6';
import '@antv/x6-angular-shape'
import { createElement } from '@antv/x6/lib/util/dom/elem';

@Component({
  selector: 'app-desicion-diagram',
  templateUrl: './desicion-diagram.component.html',
  styleUrls: ['./desicion-diagram.component.scss']
})
export class DesicionDiagramComponent implements OnInit {

  constructor() { }

  graph: any;
  stencil: any;

  ports: any;
  labelText: string = 'Lorem ipsum dolor sit amet akjnsdadaadsasda.';

  ngOnInit(): void {
    this.desicion();
  }

  desicion(){
    this.createGraph()
    this.createStencil()
    
    const r1 = this.graph.createNode({
      shape: 'html',
      x: 120,
      y: 80,
      width: 260,
      height: 112,
      data: 1,
      attrs: {
        body: {
          rx: 10,
          ry: 10,
        },
      },
      ports: { ...this.portConfig(6, 2) },
      html: () => {
        const wrap = document.createElement('div')
        const text = document.createElement('textarea')
        const date = document.createElement('div')
        const dateText = document.createElement('span')
        const options = this.addOptionMenu();
        options.className = "options"
        dateText.className = "dateText"
        date.className = "date"
        wrap.className = "graph"
        text.className = 'text'
        text.innerText = this.labelText
        dateText.innerText = '13-02-01'
        date.appendChild(dateText)
        wrap.appendChild(options)
        wrap.appendChild(text)
        wrap.appendChild(date)
        return wrap
      },
    })

    this.stencil.load([r1], 'group1')

    const d1 = this.graph.createNode({
        shape: 'path',
        x: 500,
        y: 300,
        width: 38,
        height: 46,
        attrs: {
          body: {
            cursor: 'pointer',
            stroke: 'none',
            fill: '#6C7FF9',
            rx: 10,
            ry: 10,
          },
        },
        path: 'M1.85277 25.6958C0.472994 23.8996 0.472995 21.4002 1.85277 19.604L15.2511 2.16189C17.2526 -0.443592 21.18 -0.44359 23.1815 2.16189L36.5798 19.604C37.9596 21.4002 37.9596 23.8996 36.5798 25.6958L23.1815 43.1379C21.18 45.7434 17.2526 45.7434 15.2511 43.1379L1.85277 25.6958Z',
        ports: { ...this.portConfig(4, 1) },
    })

    this.stencil.load([d1], 'group2')

    Graph.registerEdge(
      'custom-edge-label',
      {
        inherit: 'edge',
        defaultLabel: {
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            label: {
              fill: '#9D9D9C',
              fontSize: 14,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
              pointerEvents: 'none',
            },
            body: {
              ref: 'label',
              alignItems: 'center',
              fill: '#ffffff',
              stroke: '#ffffff',
              strokeWidth: 2,
              rx: 6,
              ry: 6,
              refWidth: '20px',
              refHeight: '20px',
              refX: '20%',
              refY: '20%',
            },
          },
          position: {
            distance: 400,
            options: {
              absoluteDistance: false,
              reverseDistance: true,
            },
          },
        },
      },
      true,
    )

    this.addEvents(this.graph);
  }

  addOptionMenu(){
    const options = document.createElement('div');
    const threeDots = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    threeDots.setAttribute('fill', 'none');
    threeDots.setAttribute('viewBox', '0 0 25 15');
    path.setAttribute('fill', '#5F5F6E');
    path.setAttribute('d', 'M9.60938 2.375C9.60938 1.23242 8.64258 0.265625 7.5 0.265625C6.32812 0.265625 5.39062 1.23242 5.39062 2.375C5.39062 3.54688 6.32812 4.48438 7.5 4.48438C8.64258 4.48438 9.60938 3.54688 9.60938 2.375ZM12.6562 0.265625C11.4844 0.265625 10.5469 1.23242 10.5469 2.375C10.5469 3.54688 11.4844 4.48438 12.6562 4.48438C13.7988 4.48438 14.7656 3.54688 14.7656 2.375C14.7656 1.23242 13.7988 0.265625 12.6562 0.265625ZM2.34375 0.265625C1.17188 0.265625 0.234375 1.23242 0.234375 2.375C0.234375 3.54688 1.17188 4.48438 2.34375 4.48438C3.48633 4.48438 4.45312 3.54688 4.45312 2.375C4.45312 1.23242 3.48633 0.265625 2.34375 0.265625Z');
    threeDots.appendChild(path);
    options.appendChild(threeDots);
    return options;
  }

  addEvents(graph: Graph){
    const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
        if (ports[i].hasAttribute("id")){
          ports[i].style.visibility = 'visible'
        }
      };
    }

    graph.on('node:mouseenter', ({ node }) => {
      const nodeContainer = document.querySelector("[data-cell-id='" + node.id + "']")!
      if(node.shape != 'path'){
        const optionContainer = nodeContainer.querySelector(".options")! as HTMLElement
        optionContainer.style.visibility = 'visible';
      }
      const ports = nodeContainer.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGElement>
      showPorts(ports, true)
    })

    graph.on('node:mouseleave', ({ node }) => {
      const nodeContainer = document.querySelector("[data-cell-id='" + node.id + "']")!
      if(node.shape != 'path'){
        const optionContainer = nodeContainer.querySelector(".options")! as HTMLElement
        optionContainer.style.visibility = 'hidden';
      }
      const ports = nodeContainer.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGElement>
      showPorts(ports, false)
    })

    graph.on('node:click', ({ node }) => {
      if (node.shape == 'path'){
        node.remove();
      }
    })

    graph.on('edge:dblclick', ({ edge }) => {
      edge.remove()
      const container = document.getElementById("container")!
      const ports = container.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGElement>
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        if (ports[i].getAttribute("port") == edge.getSourcePortId() || ports[i].getAttribute("port") == edge.getTargetPortId()){
          ports[i].removeAttribute("id")
          ports[i].style.visibility = 'hidden'
        }
      }
    })
  }

  createGraph(){
    this.graph = new Graph({
      container: document.getElementById('container')!,
      grid: false,
      onEdgeLabelRendered: (args) => {
        const { label, selectors } = args
        const content = selectors.foContent as HTMLDivElement
        if (content) {
          const arrowLabel = document.createElement('textarea')
          arrowLabel.className = 'arrowLabel'
          arrowLabel.placeholder = 'Type something'
          arrowLabel.maxLength = 30
          content.appendChild(arrowLabel)
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
            shape:'custom-edge-label',
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

  createStencil(){
    const container = document.getElementById('container')!
    const stencilContainer = document.createElement('div')
    stencilContainer.id = 'stencil'
    const graphContainer = document.createElement('div')
    graphContainer.id = 'graph-container'
    container.appendChild(stencilContainer)
    container.appendChild(graphContainer)
    this.stencil = new Addon.Stencil({
      title: '',
      target: this.graph,
      stencilGraphWidth: 300,
      stencilGraphHeight: 180,
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
        columnWidth: 300,
        rowHeight: 50,
      },
    })
    document.getElementById('container')!.appendChild(this.stencil.container)
    // #endregion
  }

  portConfig(size: number, strokeWidth: number){
    return this.ports = {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: size,
              magnet: true,
              stroke: '#6C7FF9',
              strokeWidth: strokeWidth,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: size,
              magnet: true,
              stroke: '#6C7FF9',
              strokeWidth: strokeWidth,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: size,
              magnet: true,
              stroke: '#6C7FF9',
              strokeWidth: strokeWidth,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: size,
              magnet: true,
              stroke: '#6C7FF9',
              strokeWidth: strokeWidth,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
        },
        {
          group: 'right',
        },
        {
          group: 'bottom',
        },
        {
          group: 'left',
        },
      ],
    }
  }
}