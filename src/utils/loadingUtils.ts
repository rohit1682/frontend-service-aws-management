import { store } from '../store'
import { setLoading, setLoadingWithMessage } from '../store/loadingSlice'

/**
 * Utility functions to control loading state from anywhere in the app
 */
export const loadingUtils = {
    /**
     * Show loading spinner
     */
    show: (message?: string) => {
        if (message) {
            store.dispatch(setLoadingWithMessage({ isLoading: true, message }))
        } else {
            store.dispatch(setLoading(true))
        }
    },

    /**
     * Hide loading spinner
     */
    hide: () => {
        store.dispatch(setLoading(false))
    },

    /**
     * Show loading for a specific duration
     */
    showFor: (duration: number, message?: string) => {
        loadingUtils.show(message)
        setTimeout(() => {
            loadingUtils.hide()
        }, duration)
    },

    /**
     * Wrap an async function with loading state
     */
    withLoading: async <T>(
        asyncFn: () => Promise<T>,
        message?: string
    ): Promise<T> => {
        try {
            loadingUtils.show(message)
            const result = await asyncFn()
            return result
        } finally {
            loadingUtils.hide()
        }
    }
}