function getSizesCubeTogether(bodyRef) {
  const childrens = Array.from(bodyRef.current.children);

  const { leftPos, topPos, rightPos, bottomPos } = childrens.reduce(
    (acc, child) => {
      const rect = child.getBoundingClientRect();
      return {
        leftPos: Math.min(acc.leftPos, rect.left),
        topPos: Math.min(acc.topPos, rect.top),
        rightPos: Math.max(acc.rightPos, rect.right),
        bottomPos: Math.max(acc.bottomPos, rect.bottom),
      };
    },
    {
      leftPos: Infinity,
      topPos: Infinity,
      rightPos: -Infinity,
      bottomPos: -Infinity,
    }
  );

  const widthWrapper = rightPos - leftPos;
  const heightWrapper = bottomPos - topPos;

  const offsetX = leftPos < 0 ? Math.abs(leftPos) : 0;
  const offsetY = topPos < 0 ? Math.abs(topPos) : 0;

  const adjustedWidth = widthWrapper + offsetX;
  const adjustedHeight = heightWrapper + offsetY;

  return {
    width: adjustedWidth,
    height: adjustedHeight,
  };
}

export default getSizesCubeTogether;
