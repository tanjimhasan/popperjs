import {getNearestOverflowAncestor} from './getNearestOverflowAncestor';
import {getWindow} from './window';
import {isOverflowElement} from './is';

export function getOverflowAncestors(
  node: Node,
  list: Array<Element | Window | VisualViewport> = []
): Array<Element | Window | VisualViewport> {
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === node.ownerDocument?.body;
  const win = getWindow(scrollableAncestor);
  const target = isBody
    ? ([win] as any).concat(
        win.visualViewport || [],
        isOverflowElement(scrollableAncestor) ? scrollableAncestor : []
      )
    : scrollableAncestor;
  const updatedList = list.concat(target);

  return isBody
    ? updatedList
    : updatedList.concat(getOverflowAncestors(target));
}
