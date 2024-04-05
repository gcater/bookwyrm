function AutoFormTooltip({ fieldConfigItem }: { fieldConfigItem: any }) {
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      {fieldConfigItem?.description && (
        <p className="text-sm text-gray-500 dark:text-white">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
          {fieldConfigItem.description}
        </p>
      )}
    </>
  );
}

export default AutoFormTooltip;
