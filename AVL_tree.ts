import { TreeNode, BinarySearchTree } from "./tree.ts";

class AVLNode extends TreeNode{
    data : Number;
    left: AVLNode | null;
    right: AVLNode | null;
    constructor(data:Number){
        super(data);
        this.data = data;
        this.left = null;
        this.right = null;
    }
    getBalanceFactor() : Number{
        // positive means left-side is heavy, negative means right-side is heavy
        let factor = 0;
        if(this.left){
            factor+=(1+this.left.nodeHeight());
        }
        if(this.right){
            factor-=(1+this.right.nodeHeight());
        }
        return factor;
    }
    rotateSelfLeft(){
      let ptr = new AVLNode(this.data);
      ptr.left = this.left;
      ptr.right = this.right ? this.right.left : null;
      this.data = this.right?.data;
      this.right = this.right ? this.right.right : null;
      this.left = ptr;
    }
    rotateSelfRight(){
      let ptr = new AVLNode(this.data);
      ptr.right = this.right;
      ptr.left = this.left ? this.left.right : null;
      this.data = this.left?.data;
      this.left = this.left ? this.left.left : null;
      this.right = ptr;
    }
    
}

class AVLTree extends BinarySearchTree{
    root : AVLNode | null;
    constructor(){
        super();
    }
    getImbalancedNodeInPathOfNode(data: Number){{
      let ptr = this.root;
      let unbalancedNode:AVLNode|null = null;
      while(ptr!=null && ptr.data!=data){
        if(Math.abs(ptr.getBalanceFactor().valueOf()) > 1){
          unbalancedNode = ptr;
        }
        if(ptr.data>data){
          ptr=ptr.left;
        }
        else{
          ptr=ptr.right;
        }
      }
      return unbalancedNode;
    }

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
            ptr.left = new AVLNode(data);
          } else {
            ptr.right = new AVLNode(data);
          }
        } else {
          this.root = new AVLNode(data);
        }
        this.count++;
      }
}

function main(){
    let avlTree = new AVLTree();
    avlTree.addNode(7);
    avlTree.addNode(8);
    avlTree.addNode(6);
    avlTree.addNode(4);
    avlTree.addNode(3);
    avlTree.addNode(5);

    console.log(avlTree.preorderTraversal());
    console.log(avlTree.inorderTraversal());
    console.log(avlTree.postorderTraversal());
    
    let n = avlTree.getImbalancedNodeInPathOfNode(5);
    // console.log(n);
    console.log("Balance factor for n : ",n?.getBalanceFactor());
    console.log("Balance factor for n.left : ",n?.left?.getBalanceFactor());
    console.log("Balance factor for n.right : ",n?.right?.getBalanceFactor());
    n?.rotateSelfRight();
    console.log("After rotation");
    
    console.log(avlTree.preorderTraversal());
    console.log(avlTree.inorderTraversal());
    console.log(avlTree.postorderTraversal());
    
}

main();