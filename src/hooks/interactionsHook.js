import { useMutation } from "@tanstack/react-query";

//failed attempt in generalizing the usemutate for liking or following but it turned out to be more complex putting me throught prototypes hell and not much of reusability
//and it just fits those specific 2 use cases
// than just repeating it leaving it right here but its not used in the whole app
//not exporting to deprecate it and not expose it
function booleanInteractionHook({
  positiveFn,
  negativeFn,
  boolKey,
  data,
  setData,
  boolKeysList,
  numericalKeysList,
  invalidateQueriesObjectsList,
}) {
  return useMutation({
    //reversed because onmutate changes it before using the function
    mutationFn: data[boolKey] ? positiveFn : negativeFn,
    onMutate() {
      const oldData = data;
      let newData = { ...data };
      for (const key in boolKeysList) {
        newData[key] = !data[key];
      }
      if (numericalKeysList) {
        for (const key in numericalKeysList) {
          newData[key] = currentUser[boolKey]
            ? currentUser[key] - 1
            : currentUser[key] + 1;
        }
      }
      setData(newData);
      return oldData;
    },
    onSuccess() {
      invalidateQueriesObjectsList.array.forEach((element) => {
        queryClient.invalidateQueries(element);
      });
    },
    onError(context) {
      setData(context);
    },
  });
}
