import { IOptions } from 'sanitize-html';
import sanitizeHtml from 'sanitize-html';

export const FAKE_FOLDERS = [
  {
    mailbox: 'alvarez@tintoreria.com',
    name: 'Archivo',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAFSAAA=',
    children: []
  },
  {
    mailbox: 'alvarez@tintoreria.com',
    name: 'Bandeja de entrada',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAEMAAA=',
    children: [
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'FOLDER 1',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAQcld10AAA=',
        children: []
      },
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'FOLDER 2',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAQcld13AAA=',
        children: []
      },
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'glpi',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUPdAAA=',
        children: []
      },
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'Happyforce',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAADFQTGzAAA=',
        children: []
      },
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'IBM',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUPgAAA=',
        children: []
      },
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'linkedin',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUPeAAA=',
        children: []
      },
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'Transporte',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAABA23yAAA=',
        children: []
      }
    ]
  },
  {
    mailbox: 'alvarez@tintoreria.com',
    name: 'Bandeja de salida',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAELAAA=',
    children: []
  },
  {
    mailbox: 'alvarez@tintoreria.com',
    name: 'Borradores',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAEPAAA=',
    children: []
  },
  {
    mailbox: 'alvarez@tintoreria.com',
    name: 'Correo no deseado',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAEWAAA=',
    children: []
  },
  {
    mailbox: 'alvarez@tintoreria.com',
    name: 'Elementos eliminados',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAEKAAA=',
    children: [
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'Amazon',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUOsAAA=',
        children: []
      },
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'Bandeja de entrada',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUPfAAA=',
        children: []
      },
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'Paypal',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUOqAAA=',
        children: []
      }
    ]
  },
  {
    mailbox: 'alvarez@tintoreria.com',
    name: 'Elementos enviados',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAEJAAA=',
    children: []
  },
  {
    mailbox: 'alvarez@tintoreria.com',
    name: 'Historial de conversaciones',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAE8AAA=',
    children: []
  },
  {
    mailbox: 'alvarez@tintoreria.com',
    name: 'Problemas de sincronización',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAABA2XlAAA=',
    children: [
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'Conflictos',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAABA2XmAAA=',
        children: []
      },
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'Error local',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAABA2XnAAA=',
        children: []
      },
      {
        mailbox: 'alvarez@tintoreria.com',
        name: 'Errores del servidor',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAABA2XoAAA=',
        children: []
      }
    ]
  },
  {
    mailbox: 'alvarez@tintoreria.com',
    name: 'Spambox',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAE4z1MAAA=',
    children: []
  }
];

export const SANITIZE_CONFIG: IOptions = {
  allowedTags: false, // Permitir todas las etiquetas
  allowedAttributes: false, // Permitir todos los atributos
  exclusiveFilter: (frame: any) => {
    const tags = ['script', 'input', 'textarea', 'button', 'select'];
    // Filtrar las etiquetas que no deseas permitir
    return tags.includes(frame.tag);
  },
  transformTags: {
    // Transformar cualquier etiqueta que tenga atributos peligrosos a una etiqueta segura (en este caso, eliminará los eventos de JavaScript)
    '*': (tagName: string, attribs: { [key: string]: string }) => {
      // Eliminar eventos de JavaScript
      Object.keys(attribs).forEach(attr => {
        if (attr.startsWith('on')) {
          delete attribs[attr];
        }
      });
      return {
        tagName,
        attribs
      };
    }
  }
};
