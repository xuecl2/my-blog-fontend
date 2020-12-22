const app = {
    state: {
        clinetScreenSizeType: 'PC',
        screenTypeBreakPoint: [
            {size: 0, type: 'mobile'},
            {size: 720, type: 'PC'}
        ]
    },
    getters: {
        clinetScreenSizeType(state) {
            return state.clinetScreenSizeType
        },
    },
    mutations: {
        setClinetScreenSizeType(state, size) {
            for(let i=0; i<state.screenTypeBreakPoint.length; i++) {
                let screenTypeBreakPointItem = state.screenTypeBreakPoint[state.screenTypeBreakPoint.length - i - 1]
                if(size > screenTypeBreakPointItem.size) {
                    state.clinetScreenSizeType = screenTypeBreakPointItem.type
                    return
                }
            }
        },
    },
    actions: {
    },
}
export default app