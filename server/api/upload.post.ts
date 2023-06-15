import multer from 'multer';
import { callNodeListener } from 'h3';

let fileNameVar: string;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp/uploads/');
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname
      .toLocaleLowerCase()
      .replace(/\s/g, '_')}`;
    fileNameVar = fileName;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype === 'image/webp'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

export default defineEventHandler(async (event) => {
  try {
    await callNodeListener(
      // @ts-expect-error: Nuxt 3
      upload.single('file'),
      event.node.req,
      event.node.res
    );
    return {
      status: 200,
      body: { message: 'File uploaded successfully', fileName: fileNameVar },
    };
  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.',
    });
  }
});
