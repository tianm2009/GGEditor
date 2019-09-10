import G6 from '@antv/g6';
import uuidv4 from 'uuid/v4';
import { EditorEvent, ItemState, ItemType } from '../common/constants';
import { Edge, Graph, GraphNativeEvent, Item, Node } from '../common/interface';

/** 生成唯一标识 */
export function uuid() {
  return uuidv4().replace(/-/g, '');
}

/** 拼接查询字符 */
export const toQueryString = (obj: object) =>
  Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');

/** 添加事件监听 */
export function addListener<T>(target: Graph, eventName: EditorEvent | GraphNativeEvent, handler: T | undefined) {
  if (typeof handler === 'function') {
    target.on(eventName, handler);
  }
}

/** 判断是否脑图 */
export function isMind(graph: Graph) {
  return graph.constructor === G6.TreeGraph;
}

/** 判断是否节点 */
export function isNode(item: Item) {
  return item.getType() === ItemType.Node;
}

/** 判断是否边线 */
export function isEdge(item: Item) {
  return item.getType() === ItemType.Edge;
}

/** 获取选中节点 */
export function getSelectedNodes(graph: Graph) {
  return graph.findAllByState<Node>(ItemType.Node, ItemState.Selected);
}

/** 获取选中边线 */
export function getSelectedEdges(graph: Graph) {
  return graph.findAllByState<Edge>(ItemType.Edge, ItemState.Selected);
}

/** 获取高亮边线 */
export function getHighlightEdges(graph: Graph) {
  return graph.findAllByState<Edge>(ItemType.Edge, ItemState.HighLight);
}

/** 执行批量处理 */
export function executeBatch(graph: Graph, execute: Function) {
  graph.setAutoPaint(false);

  execute();

  graph.paint();
  graph.setAutoPaint(true);
}

export function recursiveTraversal(root, callback) {
  if (!root) {
    return;
  }

  callback(root);

  if (!root.children) {
    return;
  }

  root.children.forEach(item => recursiveTraversal(item, callback));
}
