class TreeNode {
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
}

class BinarySearchTree {
  root: TreeNode | null;
  count : number = 0;

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

  searchNode(data: Number) : TreeNode|void {
    if(this.root){
        let ptr : TreeNode|null= this.root;
        while(ptr?.data != data && ptr!=null){
            if(data < ptr.data){
              ptr = ptr.left;
            }
            else{
              ptr = ptr.right;
            }
        }
        if(ptr?.data == data){
          return ptr;
        }
    }
      return;
  }
  
  deleteNode(data: Number) {
    if(this.root){
      let preptr: TreeNode|null = null;
      let ptr : TreeNode|null = this.root;
      while(ptr!=null && ptr.data != data){
        preptr = ptr;
        if(data < ptr.data){
          ptr = ptr.left;
        }
        else{
          ptr = ptr.right;
        }
      }
      if(ptr == null){
        console.log("No such node found.")
        return;
      }
      // if ptr is leaf node
      if(ptr.left == null && ptr.right==null){
        if(ptr == this.root){
          this.root = null;
        }
        else{
          if(preptr?.left == ptr){
            preptr.left = null
          }
          else{
            preptr.right = null;
          }
        }
      }
      else if (ptr.left == null && ptr.right!=null){
        if(preptr?.left == ptr){
          preptr.left = ptr.right;
        }
        else{
          preptr.right = ptr.right;
        }
      }
      else if (ptr.left != null && ptr.right == null){
        if(preptr?.left == ptr){
          preptr.left = ptr.left;
        }
        else{
          preptr.right = ptr.left;
        }
      }
      else{
        // deleting node has both children
      }
      this.count--;
    }
    else{
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
}

function main(): void {
  let bst = new BinarySearchTree();
  bst.addNode(3);
  bst.addNode(2);
  bst.addNode(1);
  bst.addNode(5);
  bst.addNode(6);
  // console.log(bst.searchNode(1));
  console.log("PreOrder Traversal : " + bst.preorderTraversal());
  console.log("InOrder Traversal : " + bst.inorderTraversal());
  console.log("PostOrder Traversal : " + bst.postorderTraversal());
  console.log(bst.count);
  // bst.deleteNode();
  console.log("PreOrder Traversal : " + bst.preorderTraversal());
  console.log("InOrder Traversal : " + bst.inorderTraversal());
  console.log("PostOrder Traversal : " + bst.postorderTraversal());
  console.log(bst.count);
}

main();
