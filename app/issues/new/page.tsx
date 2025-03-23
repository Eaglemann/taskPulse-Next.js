"use client";
import { Button, TextField } from "@radix-ui/themes";
import { FaceIcon } from "@radix-ui/react-icons";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title">
        <TextField.Slot>
          <FaceIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
