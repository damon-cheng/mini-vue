const h = (tag, props, children) => {
    return {
        tag, 
        props,
        children
    }
}

const mount = (vnode, container) => {
    const el = vnode.el = document.createElement(vnode.tag)

    if(vnode.props) {
        for(const key in vnode.props) {
            const value = vnode.props[key]
            if(key.startsWith("on")) {
                el.addEventListener(key.slice(2).toLowerCase(), value)
            }else {
                el.setAttribute(key, value)
            }
        }
    }

    if(vnode.children) {
        if(typeof vnode.children == "string") {
            el.textContent = vnode.children
        }else {
            vnode.children.forEach(item => {
                mount(item, el)
            });
        }
    }

    container.appendChild(el)
}