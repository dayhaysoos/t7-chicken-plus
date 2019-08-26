export function mapPropsToNavigationRouteParams(
    props,
    prevProps,
    getPropsToMap,
) {
    if (!props) return;
    const propsToMap = getPropsToMap(props);
  
    if (
        !prevProps ||
      JSON.stringify(getPropsToMap(prevProps)) !== JSON.stringify(propsToMap)
    ) {
        props.navigation.setParams(getPropsToMap(props));
    }
}