export function JsonRenderer({ json }: { json: any }) {
  // construct a {key: value} object from the json
  const jsonKeys = Object.keys(json);
  const jsonValues = Object.values(json);
  const jsonKeyValues = jsonKeys.map((key, index) => {
    return { [key]: jsonValues[index] };
  });

  return (
    <div className="divide-y text-sm font-mono grid">
      {jsonKeyValues.map((keyValue, index) => {
        const key = Object.keys(keyValue)[0];
        const value = Object.values(keyValue)[0];
        return (
          <div
            key={"json-renderer-" + index}
            className="p-1 grid grid-cols-6 relative"
          >
            <div className="col-span-2">{key}</div>{" "}
            <div className="col-span-4">{JSON.stringify(value)}</div>
          </div>
        );
      })}
    </div>
  );
}
