import { onMount } from "solid-js";

const NewRoom = () => {
  let inputRef;

  const onContinue = () => {
    const roomId = inputRef.value.trim();
    const baseUrl = `${window.location.protocol}//${window.location.host}/room`;

    if (roomId.length === 0) {
      window.location.href = baseUrl;
      return;
    };

    const params = new URLSearchParams();
    params.set('id', roomId);

    window.location.href = `${baseUrl}?${params}`;
  };

  onMount(() => {
    inputRef.focus();
  })

  return (
    <div class="flex flex-col w-1/2">
      <label for="roomId" class="block text-sm font-medium text-gray-700">Room</label>

      <div class="mt-1">
        <input class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" ref={inputRef} id="roomId" type="text" />
      </div>

      <div class="mt-4 w-full">
        <button class="w-full inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 justify-center" type="button" onClick={onContinue}>Continue</button>
      </div>
    </div>
  );
};

export default NewRoom;