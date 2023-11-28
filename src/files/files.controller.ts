import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express'
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
@ApiTags('Files')
@Controller('files')
export class FilesController {
    private static filename;
    private static allowedFileExtensions = ['.jpg', '.jpeg', '.png']; // Agrega las extensiones permitidas
    private static maxFileSizeInBytes = 20 * 1024 * 1024; // 5 MB, ajusta este valor según tus necesidades
    @ApiOperation({ summary: 'Subir un archivo de imagen al servidor', description: 'Unicamente resive un archivo de imagen y en autometico se le asignara un id' })
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination:__dirname+'//public', // Ruta relativa al directorio raíz del proyecto
            filename: (req, file, cb) => {
              FilesController.filename =uuidv4();//Se le asigna una id unica a la imagen
              const uniqueFileName = `${FilesController.filename}${extname(file.originalname)}`;
              return cb(null, uniqueFileName);
            },
          }),
          fileFilter: (req, file, cb) => {
            const isValidExtension = FilesController.allowedFileExtensions.includes(extname(file.originalname).toLowerCase());
            if (!isValidExtension) {
              cb(new Error('Formato de archivo no permitido'), false);
            }
            if (file.size > FilesController.maxFileSizeInBytes) {
              return cb(new Error('El archivo es demasiado grande'), false);
            }
            cb(null, true);
          },
          limits: {
            fileSize: FilesController.maxFileSizeInBytes,
          },
        }),
      )
      uploadFiles(@UploadedFile() file: Express.Multer.File ) {
        if (!file) {
          return 'Ningún archivo cargado.'
        }
        return {response:`Archivo con nombre ${FilesController.filename}${extname(file.originalname)} cargado exitosamente.`};
      }
      @ApiOperation({ summary: 'Peticion que response con el archivo de imagen correspondiente a el `id` o `filename`', description: 'Se debe de especificar el filename sin olvidar colocar la `extencion` del archivo.' })
      @Get(':imageName')
        serveImage(@Param('imageName') imageName: string, @Res() res: Response) {
            const imagePath = join(__dirname,`\\public\\${imageName}`);
        res.sendFile(imagePath);
  }
    }

