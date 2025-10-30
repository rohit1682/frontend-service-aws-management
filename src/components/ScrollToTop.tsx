import { useScrollToTop } from '../hooks/useScrollToTop'

/**
 * Component that automatically scrolls to top on route changes
 * Place this component anywhere in your router tree
 */
const ScrollToTop = () => {
  useScrollToTop()
  return null
}

export default ScrollToTop