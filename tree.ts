export class TreeNode {
  data: Number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(data: Number) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
  inorderTraversal(): Number[] {
    let arr: Number[] = [];
    if (this.left) {
      arr = [...this.left.inorderTraversal()];
    }
    arr = [...arr, this.data];
    if (this.right) {
      arr = [...arr, ...this.right.inorderTraversal()];
    }
    return arr;
  }
  preorderTraversal(): Number[] {
    let arr: Number[] = [];
    arr = [this.data];
    if (this.left) {
      arr = [...arr, ...this.left.preorderTraversal()];
    }
    if (this.right) {
      arr = [...arr, ...this.right.preorderTraversal()];
    }
    return arr;
  }
  postorderTraversal(): Number[] {
    let arr: Number[] = [];
    if (this.left) {
      arr = [...this.left.postorderTraversal()];
    }
    if (this.right) {
      arr = [...arr, ...this.right.postorderTraversal()];
    }
    arr = [...arr, this.data];
    return arr;
  }
  nodeHeight(){
    if(this.left == null && this.right == null){
      return 0;
    }
    else if (this.left!=null && this.right==null){
      return 1+this.left.nodeHeight();
    }
    else if (this.left==null && this.right!=null){
      return 1+this.right.nodeHeight();
    }
    else{
      return 1 + Math.max(this.left?.nodeHeight(), this.right?.nodeHeight())
    }
  }
  getSVGNodeWithChildren(level:number, x:Number, y:Number, width:number, svg:SVGElement){
    let g = document.createElementNS("http://www.w3.org/2000/svg","g");
    let circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
    circle.setAttribute("cx",x.toString())
    circle.setAttribute("cy",y.toString())
    circle.setAttribute("r","50")
    circle.style.fill="yellow";
    let text = document.createElementNS("http://www.w3.org/2000/svg","text");
    text.textContent = this.data.toString();
    text.setAttribute("dominant-baseline","central")
    text.setAttribute("text-anchor","middle")
    text.style.fontSize = "300%";
    text.style.fill="red" // text colour
    text.setAttribute("x",x.toString())
    text.setAttribute("y",y.toString())

    if(this.left){
      let line = document.createElementNS("http://www.w3.org/2000/svg","line");
      let x2 = x.valueOf()-(width/Math.pow(2,(level+2)))
      let y2 = y.valueOf()+150
      line.setAttribute("x1",x.toString())
      line.setAttribute("y1",y.toString())
      line.setAttribute("x2",x2.toString())
      line.setAttribute("y2",y2.toString())
      line.style.stroke = "red";
      svg.appendChild(line)
      this.left.getSVGNodeWithChildren(level+1,x2,y2,width, svg);
    }
    if(this.right){
      let line = document.createElementNS("http://www.w3.org/2000/svg","line");
      let x2 = x.valueOf()+(width/Math.pow(2,(level+2)))
      let y2 = y.valueOf()+150
      line.setAttribute("x1",x.toString())
      line.setAttribute("y1",y.toString())
      line.setAttribute("x2",x2.toString())
      line.setAttribute("y2",y2.toString())
      line.style.stroke = "red";
      svg.appendChild(line)
      this.right.getSVGNodeWithChildren(level+1,x2,y2,width, svg);
    }
    g.appendChild(circle)
    g.appendChild(text)
    svg.appendChild(g)
  }
}

export class BinarySearchTree {
  root: TreeNode | null;
  count: number = 0;
  constructor(){
    this.root = null;
  }

  isEmpty(): boolean {
    return this.root ? false : true;
  }

  addNode(data: Number) {
    if (this.root) {
      let ptr = this.root;
      while (true) {
        if (data < ptr.data) {
          if (ptr.left) {
            ptr = ptr.left;
          } else {
            break;
          }
        } else {
          if (ptr.right) {
            ptr = ptr.right;
          } else {
            break;
          }
        }
      }
      if (data < ptr.data) {
        ptr.left = new TreeNode(data);
      } else {
        ptr.right = new TreeNode(data);
      }
    } else {
      this.root = new TreeNode(data);
    }
    this.count++;
  }

  searchNode(data: Number): TreeNode | void {
    if (this.root) {
      let ptr: TreeNode | null = this.root;
      while (ptr?.data != data && ptr != null) {
        if (data < ptr.data) {
          ptr = ptr.left;
        } else {
          ptr = ptr.right;
        }
      }
      if (ptr?.data == data) {
        return ptr;
      }
    }
    return;
  }

  deleteNode(data: Number) {
    if (this.root) {
      let preptr: TreeNode | null = null;
      let ptr: TreeNode | null = this.root;
      while (ptr != null && ptr.data != data) {
        preptr = ptr;
        if (data < ptr.data) {
          ptr = ptr.left;
        } else {
          ptr = ptr.right;
        }
      }
      if (ptr == null) {
        console.log("No such node found.");
        return;
      } else {
        // if ptr is leaf node
        if (ptr.left == null && ptr.right == null) {
          if (ptr == this.root) {
            this.root = null;
          } else {
            if (preptr?.left == ptr) {
              preptr.left = null;
            } else {
              preptr.right = null;
            }
          }
        } else if (ptr.left == null && ptr.right != null) {
          if (preptr?.left == ptr) {
            preptr.left = ptr.right;
          } else {
            preptr.right = ptr.right;
          }
        } else if (ptr.left != null && ptr.right == null) {
          if (preptr?.left == ptr) {
            preptr.left = ptr.left;
          } else {
            preptr.right = ptr.left;
          }
        } else {
          // deleting node has both children
          // here we need to find the inorder predescessor (or successor)
          let ptr1: TreeNode | null = ptr;
          let ptr2: TreeNode | null = ptr.left;
          while (ptr2?.right) {
            ptr1 = ptr2;
            ptr2 = ptr2.right;
          }
          ptr.data = ptr2.data;
          if(ptr1.left == ptr2){
            ptr1.left = ptr2?.left ? ptr2.left : null;
          }
          else{
            ptr1.right = ptr2?.left ? ptr2.left : null;
          }
        }
        this.count--;
      }
    } else {
      console.log("Tree is already empty.");
    }
  }

  inorderTraversal() {
    return this.root ? this.root.inorderTraversal() : [];
  }

  preorderTraversal() {
    return this.root ? this.root.preorderTraversal() : [];
  }

  postorderTraversal() {
    return this.root ? this.root.postorderTraversal() : [];
  }

  maxDepth(){
    return this.root?.nodeHeight();
  }

  getSVGTree(){
    let svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
    let depth=this.maxDepth()
    let width = (Math.pow(2,depth+1)-1)*100
    let height = (depth+1)*100 + (depth)*50
    svg.setAttribute("viewBox",`0 0 ${width} ${height}`)
    svg.setAttribute("xmlns","http://www.w3.org/2000/svg")
    this.root?.getSVGNodeWithChildren(0,width/2,50,width,svg)
    return svg;
  }
}

function main(): void {
  let bst = new BinarySearchTree();
  bst.addNode(12);
  bst.addNode(6);
  bst.addNode(35);
  bst.addNode(23);
  bst.addNode(45);
  bst.addNode(4);
  bst.addNode(7);
  bst.addNode(1);
  bst.addNode(4);
  bst.addNode(3);
  // console.log(bst.searchNode(1));
  console.log("PreOrder Traversal : " + bst.preorderTraversal());
  console.log("InOrder Traversal : " + bst.inorderTraversal());
  console.log("PostOrder Traversal : " + bst.postorderTraversal());
  console.log(bst.count);
  // bst.deleteNode(6);
  // bst.deleteNode(45);
  // console.log("PreOrder Traversal : " + bst.preorderTraversal());
  // console.log("InOrder Traversal : " + bst.inorderTraversal());
  // console.log("PostOrder Traversal : " + bst.postorderTraversal());
  // console.log(bst.count);
  console.log(`Tree Max Depth is : ${bst.maxDepth()}`)
  let svg = bst.getSVGTree();
  console.log(svg)
  document.body.appendChild(svg)

}

// main();