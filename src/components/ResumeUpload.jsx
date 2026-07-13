function ResumeUpload({ resumeFile, onFileSelect }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300">
        Resume Upload
      </label>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-slate-400/50 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-4 py-8 text-center text-sm text-gray-700 dark:text-slate-300 transition hover:border-slate-500">

        <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sky-300">
          📄
        </span>

        <span className="font-medium">
          {resumeFile ? resumeFile.name : 'Upload your PDF resume'}
        </span>

        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file && file.type === "application/pdf") {
              onFileSelect(file);
            } else {
              alert("Only PDF files allowed");
            }
          }}
        />
      </label>

      <p className="text-xs text-gray-500 dark:text-slate-400">
        Your resume will be used to personalize questions and feedback.
      </p>
    </div>
  );
}

export default ResumeUpload;