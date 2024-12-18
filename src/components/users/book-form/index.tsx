import TextAreaInputComponent from "@/components/inputs/text-area";
import TextInputComponent from "@/components/inputs/text-input";
import { iBookFormValidation } from "@/form-validators/books";
import { useUploadBook } from "@/hooks/books/upload-book";
import { GetBookType, PostBookRequestType } from "@/types/book";
import { toFormData } from "@/utils/helpers/client-helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaWindowClose } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";

interface ComponentProps {
  open?: boolean;
  handleClose: () => void;
  book?: GetBookType
}

const BookFormComponent = ({ open, handleClose, book }: ComponentProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<PostBookRequestType>({
    resolver: yupResolver(iBookFormValidation),
    shouldUnregister: false,
    defaultValues: book ? {...book} : {},
  });

  const { handleBookUpload, loading } = useUploadBook(()=>{ reset() });
  const [bookCover, setBookCover] = useState<any>(null);
  const [bookFile, setBookFile] = useState<any>(null);

  const onUploadBook = handleSubmit((data: any)=>{
    const formData = toFormData(data);
    formData.set('bookFile', bookFile[0]);
    formData.set('bookCover', bookCover[0]);
    handleBookUpload(formData)
  })

  return (
    <div>
      <AnimatePresence>
        {open && (
          <motion.div
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              handleClose && handleClose();
            }}
            className="overlay"
          />
        )}
      </AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: 1000 }}
          className="fixed top-0 left-0 w-screen h-screen  inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center md:px-4"
        >
          <div className="w-[450px] max-h-[650px] rounded-md px-6 bg-background py-3 pb-4 flex flex-col gap-y-2">
            <div className="w-full h-[44px] flex items-center justify-between ">
              <h1 className="text-gray-400 text-[22px] font-medium ">
                {book ? 'Upload a new book' : 'Update book'}
              </h1>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={handleClose}
                className=""
              >
                <FaWindowClose />
              </motion.button>
            </div>

            <div className="flex flex-col gap-y-2 overflow-y-scroll" style={{scrollbarWidth:'none'}}>
              <TextInputComponent
                control={control}
                name="title"
                required
                type="text"
                error={errors.title?.message}
                placeholder="Enter the book title"
                label="Book title"
              />

              <TextInputComponent
                control={control}
                name="author"
                required
                type="text"
                error={errors.title?.message}
                placeholder="Enter the book's author"
                label="Author"
              />
             <TextInputComponent
                control={control}
                name="isbn"
                type="text"
                required
                error={errors.isbn?.message}
                placeholder="Enter the book ISBN"
                label="ISBN"
              />
              <div className="flex flex-row gap-2">
              <TextInputComponent
                control={control}
                name="year"
                type="text"
                required
                error={errors.isbn?.message}
                placeholder="Enter the book year e.g (1970)"
                label="Year"
              />

              <TextInputComponent
                control={control}
                name="pages"
                type="number"
                error={errors.pages?.message}
                placeholder="Number of pages"
                label="Pages"
              />
              </div>

              <div className="flex flex-row gap-2">
              <TextInputComponent
                control={control}
                name="bookCover"
                onInputChange={setBookCover}
                type="file"
                required
                fileAcceptedFormats="image/jpeg, image/png"
                error={errors.bookCover?.message?.toString()}
                placeholder="Upload book cover"
                label="Book cover"
              />

              <TextInputComponent
                control={control}
                name="bookFile"
                type="file"
                onInputChange={setBookFile}
                fileAcceptedFormats=".pdf"
                required
                error={errors.bookFile?.message?.toString()}
                placeholder="Upload book pdf file"
                label="Book pdf file"
              />
            </div>
              <TextAreaInputComponent
                control={control}
                label="Description"
                length={250}
                error={errors.description?.message}
                placeholder="Describe the book here in less than 250 words..."
                name="description"
                type="text"
              />

              <div className="w-full flex items-center justify-center">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={onUploadBook}
                  className="px-5 w-[200px] align-middle float-end h-[42px] my-10 text-md font-medium border bg-slate-50 rounded-[8px] text-gray-800"
                >
                  
                  {loading ? <PulseLoader size={4} /> : 'Submit'}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BookFormComponent;
