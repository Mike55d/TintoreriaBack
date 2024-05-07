import { IOptions } from 'sanitize-html';

export const FAKE_FOLDERS = [
  {
    mailbox: 'carlos.alvarez@adv-ic.com',
    name: 'Archivo',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAFSAAA=',
    children: []
  },
  {
    mailbox: 'carlos.alvarez@adv-ic.com',
    name: 'Bandeja de entrada',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAEMAAA=',
    children: [
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'FOLDER 1',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAQcld10AAA=',
        children: []
      },
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'FOLDER 2',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAQcld13AAA=',
        children: []
      },
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'glpi',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUPdAAA=',
        children: []
      },
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'Happyforce',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAADFQTGzAAA=',
        children: []
      },
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'IBM',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUPgAAA=',
        children: []
      },
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'linkedin',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUPeAAA=',
        children: []
      },
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'Transporte',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAABA23yAAA=',
        children: []
      }
    ]
  },
  {
    mailbox: 'carlos.alvarez@adv-ic.com',
    name: 'Bandeja de salida',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAELAAA=',
    children: []
  },
  {
    mailbox: 'carlos.alvarez@adv-ic.com',
    name: 'Borradores',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAEPAAA=',
    children: []
  },
  {
    mailbox: 'carlos.alvarez@adv-ic.com',
    name: 'Correo no deseado',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAEWAAA=',
    children: []
  },
  {
    mailbox: 'carlos.alvarez@adv-ic.com',
    name: 'Elementos eliminados',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAEKAAA=',
    children: [
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'Amazon',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUOsAAA=',
        children: []
      },
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'Bandeja de entrada',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUPfAAA=',
        children: []
      },
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'Paypal',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAMLUOqAAA=',
        children: []
      }
    ]
  },
  {
    mailbox: 'carlos.alvarez@adv-ic.com',
    name: 'Elementos enviados',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAEJAAA=',
    children: []
  },
  {
    mailbox: 'carlos.alvarez@adv-ic.com',
    name: 'Historial de conversaciones',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAAAAE8AAA=',
    children: []
  },
  {
    mailbox: 'carlos.alvarez@adv-ic.com',
    name: 'Problemas de sincronización',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAABA2XlAAA=',
    children: [
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'Conflictos',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAABA2XmAAA=',
        children: []
      },
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'Error local',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAABA2XnAAA=',
        children: []
      },
      {
        mailbox: 'carlos.alvarez@adv-ic.com',
        name: 'Errores del servidor',
        id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAABA2XoAAA=',
        children: []
      }
    ]
  },
  {
    mailbox: 'carlos.alvarez@adv-ic.com',
    name: 'Spambox',
    id: 'AAMkADQ3MjNjMmUzLTJlZmYtNGFkMy05OWUwLTNjYjVmMmQ0YzI3MwAuAAAAAABoZXF2pbW_TZ_jkjGQoO8oAQDRpR-3x33SQa660wFupwULAAAE4z1MAAA=',
    children: []
  }
];

export const SANITIZE_CONFIG: IOptions = {
  allowedTags: false, // Permitir todas las etiquetas
  allowedAttributes: false, // Permitir todos los atributos
  exclusiveFilter: (frame: any) => {
    // Filtrar las etiquetas que no deseas permitir
    return frame.tag === 'script';
  }
};
