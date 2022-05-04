import { Injector } from '@angular/core';
import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Graph, Node } from '@antv/x6';
import '@antv/x6-angular-shape'
import { Stencil } from '@antv/x6/lib/addon';
import X6Utils from 'src/X6Utils/x6Utils';
import { SctX6NodeDecisionComponent } from '../sct-x6-node-decision/sct-x6-node-decision.component';

@Component({
  selector: 'app-desicion-diagram',
  templateUrl: './desicion-diagram.component.html',
  styleUrls: ['./desicion-diagram.component.scss']
})
export class DesicionDiagramComponent implements OnInit, AfterViewInit {
  @ViewChild('demoTpl', { static: true })
  demoTpl!: TemplateRef<void>;
  @ViewChild('stencilContainer', {read: ElementRef}) stencilContainer!: ElementRef;
  @ViewChild('graphContainer', {read: ElementRef}) graphContainer!: ElementRef;

  constructor(private injector: Injector) { 
    
  }
  
  graph!: Graph;
  stencil!: Stencil;

  card!: Node;
  connector!: Node;

  labelText: string = 'Lorem ipsum dolor sit amet akjnsdadaadsasda.';

  angularComponent = {
    data: {
      ngArguments: {
        data: 'Angular Template'
      }
    },
    x: 120,
    y: 80,
    width: 282,
    height: 124,
    shape: 'angular-shape',
    componentName: 'sct-x6-node-decision-component',
    ports: { ...this._portConfig(6, 2) }
  }

  ngOnInit(): void{

  }

  ngAfterViewInit(): void {
    this._createGraph();
    this._registerNodes();
    this._registerEdge();
    this._createSidebar();
    this._addSidebarNodes();
    this._addSidebarToDOM();
    this._addEvents(this.graph as Graph);
  }

  private _createGraph(): void {
    this.graph = X6Utils.createGraph(this.graphContainer.nativeElement)
  }

  private _registerNodes(): void {
    Graph.registerAngularContent('sct-x6-node-decision-component', { injector: this.injector, content: SctX6NodeDecisionComponent });
    this.card = this.graph!.createNode(this.angularComponent)
    this.connector = this.graph!.createNode(this._connectorFeatures());
  }

  private _diagramFeatures(){
    return 
  }

  private _createSidebar(): void {
    this.stencil = X6Utils.createStencil(this.graph as Graph)
  }

  private _addSidebarToDOM(): void {
    this.stencilContainer.nativeElement.appendChild(this.stencil.container)
  }

  private _addSidebarNodes(): void {
    this.stencil.load([this.card], 'group1');
    this.stencil.load([this.connector], 'group2');
  }

  private _registerEdge(): void{
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
  }

  private _connectorFeatures(): any {
    return {
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
      ports: { ...this._portConfig(4, 1) },
    }
  }

  private _addEvents(graph: Graph){
    const showPorts = (ports: NodeListOf<SVGElement>, show: boolean, node: Node) => {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
        if (ports[i].hasAttribute("id")){
          ports[i].style.visibility = 'visible'
        }
        if (ports[i].hasAttribute("id") && node.shape == 'path'){
          ports[i].style.visibility = 'hidden'
        }
      };
    }

    graph.on('node:mouseenter', ({ node }) => {
      const nodeContainer = document.querySelector("[data-cell-id='" + node.id + "']")!
      if(node.shape != 'path'){
        //const optionContainer = nodeContainer.querySelector(".options")! as HTMLElement
        //optionContainer.style.visibility = 'visible';
      }
      const ports = nodeContainer.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGElement>
      showPorts(ports, true, node)
    })

    graph.on('node:mouseleave', ({ node }) => {
      const nodeContainer = document.querySelector("[data-cell-id='" + node.id + "']")!
      if(node.shape != 'path'){
        //const optionContainer = nodeContainer.querySelector(".options")! as HTMLElement
        //optionContainer.style.visibility = 'hidden';
      }
      const ports = nodeContainer.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGElement>
      showPorts(ports, false, node)
    })

    graph.on('node:click', ({ node }) => {
      if (node.shape == 'path'){
        node.remove();
      }
    })

    graph.on('edge:dblclick', ({ edge }) => {
      const ports = document.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGElement>
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        if (ports[i].getAttribute("port") == edge.getSourcePortId() || ports[i].getAttribute("port") == edge.getTargetPortId()){
          ports[i].removeAttribute("id")
          ports[i].style.visibility = 'hidden'
        }
      }
      edge.remove()
    })
  }

  private _portConfig(size: number, strokeWidth: number){
    return {
      groups: {
        top: { ...this._portFeatures('top', size, strokeWidth) },
        right: { ...this._portFeatures('right', size, strokeWidth) },
        bottom: { ...this._portFeatures('bottom', size, strokeWidth) },
        left: { ...this._portFeatures('left', size, strokeWidth) },
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

  private _portFeatures(position: string, size: number, strokeWidth: number){
    return {
      position: position,
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
    }
  }
}