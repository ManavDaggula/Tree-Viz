var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TreeNode = /** @class */ (function () {
    function TreeNode(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
    TreeNode.prototype.inorderTraversal = function () {
        var arr = [];
        if (this.left) {
            arr = __spreadArray([], this.left.inorderTraversal(), true);
        }
        arr = __spreadArray(__spreadArray([], arr, true), [this.data], false);
        if (this.right) {
            arr = __spreadArray(__spreadArray([], arr, true), this.right.inorderTraversal(), true);
        }
        return arr;
    };
    TreeNode.prototype.preorderTraversal = function () {
        var arr = [];
        arr = [this.data];
        if (this.left) {
            arr = __spreadArray(__spreadArray([], arr, true), this.left.preorderTraversal(), true);
        }
        if (this.right) {
            arr = __spreadArray(__spreadArray([], arr, true), this.right.preorderTraversal(), true);
        }
        return arr;
    };
    TreeNode.prototype.postorderTraversal = function () {
        var arr = [];
        if (this.left) {
            arr = __spreadArray([], this.left.postorderTraversal(), true);
        }
        if (this.right) {
            arr = __spreadArray(__spreadArray([], arr, true), this.right.postorderTraversal(), true);
        }
        arr = __spreadArray(__spreadArray([], arr, true), [this.data], false);
        return arr;
    };
    TreeNode.prototype.nodeHeight = function () {
        var _a, _b;
        if (this.left == null && this.right == null) {
            return 0;
        }
        else if (this.left != null && this.right == null) {
            return 1 + this.left.nodeHeight();
        }
        else if (this.left == null && this.right != null) {
            return 1 + this.right.nodeHeight();
        }
        else {
            return 1 + Math.max((_a = this.left) === null || _a === void 0 ? void 0 : _a.nodeHeight(), (_b = this.right) === null || _b === void 0 ? void 0 : _b.nodeHeight());
        }
    };
    TreeNode.prototype.getSVGNodeWithChildren = function (level, x, y, width, svg) {
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x.toString());
        circle.setAttribute("cy", y.toString());
        circle.setAttribute("r", "50");
        circle.style.fill = "yellow";
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.textContent = this.data.toString();
        text.setAttribute("dominant-baseline", "central");
        text.setAttribute("text-anchor", "middle");
        text.style.fontSize = "300%";
        text.style.fill = "red"; // text colour
        text.setAttribute("x", x.toString());
        text.setAttribute("y", y.toString());
        if (this.left) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            var x2 = x.valueOf() - (width / Math.pow(2, (level + 2)));
            var y2 = y.valueOf() + 150;
            line.setAttribute("x1", x.toString());
            line.setAttribute("y1", y.toString());
            line.setAttribute("x2", x2.toString());
            line.setAttribute("y2", y2.toString());
            line.style.stroke = "red";
            svg.appendChild(line);
            this.left.getSVGNodeWithChildren(level + 1, x2, y2, width, svg);
        }
        if (this.right) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            var x2 = x.valueOf() + (width / Math.pow(2, (level + 2)));
            var y2 = y.valueOf() + 150;
            line.setAttribute("x1", x.toString());
            line.setAttribute("y1", y.toString());
            line.setAttribute("x2", x2.toString());
            line.setAttribute("y2", y2.toString());
            line.style.stroke = "red";
            svg.appendChild(line);
            this.right.getSVGNodeWithChildren(level + 1, x2, y2, width, svg);
        }
        g.appendChild(circle);
        g.appendChild(text);
        svg.appendChild(g);
    };
    return TreeNode;
}());
var BinarySearchTree = /** @class */ (function () {
    function BinarySearchTree() {
        this.count = 0;
    }
    BinarySearchTree.prototype.isEmpty = function () {
        return this.root ? false : true;
    };
    BinarySearchTree.prototype.addNode = function (data) {
        if (this.root) {
            var ptr = this.root;
            while (true) {
                if (data < ptr.data) {
                    if (ptr.left) {
                        ptr = ptr.left;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (ptr.right) {
                        ptr = ptr.right;
                    }
                    else {
                        break;
                    }
                }
            }
            if (data < ptr.data) {
                ptr.left = new TreeNode(data);
            }
            else {
                ptr.right = new TreeNode(data);
            }
        }
        else {
            this.root = new TreeNode(data);
        }
        this.count++;
    };
    BinarySearchTree.prototype.searchNode = function (data) {
        if (this.root) {
            var ptr = this.root;
            while ((ptr === null || ptr === void 0 ? void 0 : ptr.data) != data && ptr != null) {
                if (data < ptr.data) {
                    ptr = ptr.left;
                }
                else {
                    ptr = ptr.right;
                }
            }
            if ((ptr === null || ptr === void 0 ? void 0 : ptr.data) == data) {
                return ptr;
            }
        }
        return;
    };
    BinarySearchTree.prototype.deleteNode = function (data) {
        if (this.root) {
            var preptr = null;
            var ptr = this.root;
            while (ptr != null && ptr.data != data) {
                preptr = ptr;
                if (data < ptr.data) {
                    ptr = ptr.left;
                }
                else {
                    ptr = ptr.right;
                }
            }
            if (ptr == null) {
                console.log("No such node found.");
                return;
            }
            else {
                // if ptr is leaf node
                if (ptr.left == null && ptr.right == null) {
                    if (ptr == this.root) {
                        this.root = null;
                    }
                    else {
                        if ((preptr === null || preptr === void 0 ? void 0 : preptr.left) == ptr) {
                            preptr.left = null;
                        }
                        else {
                            preptr.right = null;
                        }
                    }
                }
                else if (ptr.left == null && ptr.right != null) {
                    if ((preptr === null || preptr === void 0 ? void 0 : preptr.left) == ptr) {
                        preptr.left = ptr.right;
                    }
                    else {
                        preptr.right = ptr.right;
                    }
                }
                else if (ptr.left != null && ptr.right == null) {
                    if ((preptr === null || preptr === void 0 ? void 0 : preptr.left) == ptr) {
                        preptr.left = ptr.left;
                    }
                    else {
                        preptr.right = ptr.left;
                    }
                }
                else {
                    // deleting node has both children
                    // here we need to find the inorder predescessor (or successor)
                    var ptr1 = ptr;
                    var ptr2 = ptr.left;
                    while (ptr2 === null || ptr2 === void 0 ? void 0 : ptr2.right) {
                        ptr1 = ptr2;
                        ptr2 = ptr2.right;
                    }
                    ptr.data = ptr2.data;
                    if (ptr1.left == ptr2) {
                        ptr1.left = (ptr2 === null || ptr2 === void 0 ? void 0 : ptr2.left) ? ptr2.left : null;
                    }
                    else {
                        ptr1.right = (ptr2 === null || ptr2 === void 0 ? void 0 : ptr2.left) ? ptr2.left : null;
                    }
                }
                this.count--;
            }
        }
        else {
            console.log("Tree is already empty.");
        }
    };
    BinarySearchTree.prototype.inorderTraversal = function () {
        return this.root ? this.root.inorderTraversal() : [];
    };
    BinarySearchTree.prototype.preorderTraversal = function () {
        return this.root ? this.root.preorderTraversal() : [];
    };
    BinarySearchTree.prototype.postorderTraversal = function () {
        return this.root ? this.root.postorderTraversal() : [];
    };
    BinarySearchTree.prototype.maxDepth = function () {
        var _a;
        return (_a = this.root) === null || _a === void 0 ? void 0 : _a.nodeHeight();
    };
    BinarySearchTree.prototype.getSVGTree = function () {
        var _a;
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var depth = this.maxDepth();
        var width = (Math.pow(2, depth + 1) - 1) * 100;
        var height = (depth + 1) * 100 + (depth) * 50;
        svg.setAttribute("viewBox", "0 0 ".concat(width, " ").concat(height));
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        (_a = this.root) === null || _a === void 0 ? void 0 : _a.getSVGNodeWithChildren(0, width / 2, 50, width, svg);
        return svg;
    };
    return BinarySearchTree;
}());
function main() {
    var bst = new BinarySearchTree();
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
    console.log("Tree Max Depth is : ".concat(bst.maxDepth()));
    var svg = bst.getSVGTree();
    console.log(svg);
    document.body.appendChild(svg);
}
// main();
