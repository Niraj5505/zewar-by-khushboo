import { usePopupStore } from '../store/popupStore';

export function useShowOnce(name, version = 'v1') {
  const fullKey = `${name}.${version}`;
  const seen = usePopupStore((state) => state.seen);
  const markSeenInStore = usePopupStore((state) => state.markSeen);

  const shouldShow = !seen[fullKey];

  const markSeen = () => {
    markSeenInStore(fullKey);
  };

  return { shouldShow, markSeen, key: fullKey };
}
