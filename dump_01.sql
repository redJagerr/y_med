--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE admin;




--
-- Drop roles
--

DROP ROLE admin;


--
-- Roles
--

CREATE ROLE admin;
ALTER ROLE admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:EUDC4+DkJ7F6PoJHYFkDfg==$67vWnppU9NQ7Ne/W1LZMJhHsN3UUWKdNjRWl9iQvPJc=:7lXTUN9+TFEkKAnb+kQDyW4DXAF9K2c4G01SBW5ACdw=';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO admin;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: admin
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: admin
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "admin" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: admin; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE admin WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE admin OWNER TO admin;

\connect admin

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO admin;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Appointments; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Appointments" (
    id integer NOT NULL,
    "doctorId" text NOT NULL,
    "patientId" text NOT NULL,
    "time" timestamp(3) without time zone NOT NULL,
    status text NOT NULL,
    speciality text NOT NULL
);


ALTER TABLE public."Appointments" OWNER TO admin;

--
-- Name: Appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Appointments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Appointments_id_seq" OWNER TO admin;

--
-- Name: Appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Appointments_id_seq" OWNED BY public."Appointments".id;


--
-- Name: Doctors; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Doctors" (
    uid text NOT NULL,
    name text NOT NULL,
    "birthDate" timestamp(3) without time zone NOT NULL,
    phone text NOT NULL,
    sex text NOT NULL,
    speciality text[],
    tags text[],
    seniority integer NOT NULL,
    "averageRating" text NOT NULL,
    price integer NOT NULL,
    "photoUrl" text NOT NULL
);


ALTER TABLE public."Doctors" OWNER TO admin;

--
-- Name: DoctorsSchedule; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."DoctorsSchedule" (
    id integer NOT NULL,
    "doctorId" text NOT NULL,
    "scheduleStart" text NOT NULL,
    "scheduleEnd" text NOT NULL,
    "interval" integer NOT NULL,
    days integer[],
    weekend integer[]
);


ALTER TABLE public."DoctorsSchedule" OWNER TO admin;

--
-- Name: DoctorsSchedule_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."DoctorsSchedule_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DoctorsSchedule_id_seq" OWNER TO admin;

--
-- Name: DoctorsSchedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."DoctorsSchedule_id_seq" OWNED BY public."DoctorsSchedule".id;


--
-- Name: Education; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Education" (
    id integer NOT NULL,
    "doctorId" text NOT NULL,
    year text NOT NULL,
    title text NOT NULL
);


ALTER TABLE public."Education" OWNER TO admin;

--
-- Name: Education_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Education_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Education_id_seq" OWNER TO admin;

--
-- Name: Education_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Education_id_seq" OWNED BY public."Education".id;


--
-- Name: Expirience; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Expirience" (
    id integer NOT NULL,
    "doctorId" text NOT NULL,
    year text NOT NULL,
    title text NOT NULL
);


ALTER TABLE public."Expirience" OWNER TO admin;

--
-- Name: Expirience_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Expirience_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Expirience_id_seq" OWNER TO admin;

--
-- Name: Expirience_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Expirience_id_seq" OWNED BY public."Expirience".id;


--
-- Name: Favourites; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Favourites" (
    id integer NOT NULL,
    "patientId" text NOT NULL,
    "doctorId" text NOT NULL,
    "doctorName" text NOT NULL,
    "doctorPhoto" text NOT NULL,
    "doctorSpeciality" text NOT NULL
);


ALTER TABLE public."Favourites" OWNER TO admin;

--
-- Name: Favourites_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Favourites_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Favourites_id_seq" OWNER TO admin;

--
-- Name: Favourites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Favourites_id_seq" OWNED BY public."Favourites".id;


--
-- Name: Medcard_Access; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Medcard_Access" (
    id integer NOT NULL,
    "doctorId" text NOT NULL,
    "patientId" text NOT NULL,
    deadline timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Medcard_Access" OWNER TO admin;

--
-- Name: Medcard_Access_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Medcard_Access_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Medcard_Access_id_seq" OWNER TO admin;

--
-- Name: Medcard_Access_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Medcard_Access_id_seq" OWNED BY public."Medcard_Access".id;


--
-- Name: Medcard_Record; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Medcard_Record" (
    id text NOT NULL,
    "patientId" text NOT NULL,
    type text NOT NULL,
    photos text[],
    title text NOT NULL,
    subtitle text NOT NULL,
    date timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Medcard_Record" OWNER TO admin;

--
-- Name: Patient; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Patient" (
    uid text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "birthDate" timestamp(3) without time zone NOT NULL,
    phone text NOT NULL,
    sex text NOT NULL,
    "photoUrl" text
);


ALTER TABLE public."Patient" OWNER TO admin;

--
-- Name: Reviews; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Reviews" (
    id integer NOT NULL,
    "doctorId" text NOT NULL,
    "patientId" text NOT NULL,
    text text NOT NULL,
    rating integer NOT NULL,
    date timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Reviews" OWNER TO admin;

--
-- Name: Reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Reviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Reviews_id_seq" OWNER TO admin;

--
-- Name: Reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Reviews_id_seq" OWNED BY public."Reviews".id;


--
-- Name: Appointments id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Appointments" ALTER COLUMN id SET DEFAULT nextval('public."Appointments_id_seq"'::regclass);


--
-- Name: DoctorsSchedule id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."DoctorsSchedule" ALTER COLUMN id SET DEFAULT nextval('public."DoctorsSchedule_id_seq"'::regclass);


--
-- Name: Education id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Education" ALTER COLUMN id SET DEFAULT nextval('public."Education_id_seq"'::regclass);


--
-- Name: Expirience id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Expirience" ALTER COLUMN id SET DEFAULT nextval('public."Expirience_id_seq"'::regclass);


--
-- Name: Favourites id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Favourites" ALTER COLUMN id SET DEFAULT nextval('public."Favourites_id_seq"'::regclass);


--
-- Name: Medcard_Access id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Medcard_Access" ALTER COLUMN id SET DEFAULT nextval('public."Medcard_Access_id_seq"'::regclass);


--
-- Name: Reviews id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reviews" ALTER COLUMN id SET DEFAULT nextval('public."Reviews_id_seq"'::regclass);


--
-- Data for Name: Appointments; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Appointments" (id, "doctorId", "patientId", "time", status, speciality) FROM stdin;
32	9nSgU6jVUGSogPD08NNp1JbhIb02	ZbatmR0zLNMXNePSKExtr69ChW03	2023-04-26 14:00:00	completed	Хирург
33	DcJraLH8AUbh4M9pjy8T7utL1Ta2	ZbatmR0zLNMXNePSKExtr69ChW03	2023-04-26 14:00:00	completed	Терапевт
34	9nSgU6jVUGSogPD08NNp1JbhIb02	cY3DebtwtBTM7h4XR0DzWF2oAmx1	2023-04-28 07:00:00	completed	Хирург
35	0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1	cY3DebtwtBTM7h4XR0DzWF2oAmx1	2023-04-27 11:00:00	completed	Онколог
36	0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1	ZbatmR0zLNMXNePSKExtr69ChW03	2023-04-27 11:30:00	completed	Онколог
\.


--
-- Data for Name: Doctors; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Doctors" (uid, name, "birthDate", phone, sex, speciality, tags, seniority, "averageRating", price, "photoUrl") FROM stdin;
9nSgU6jVUGSogPD08NNp1JbhIb02	Лунакова Алена Викторовна	1980-05-08 11:06:38.855	+7999999999	Женский	{"вывихи и растяжения","незаживающие раны","различные ушибы и травмы "}	{Хирург,"Абдоминальный хирург"}	28	4.5	2000	https://firebasestorage.googleapis.com/v0/b/med-app-5bd03.appspot.com/o/9nSgU6jVUGSogPD08NNp1JbhIb02%2F1645110625_23-kartinkin-net-p-vrach-kartinki-24.jpg?alt=media&token=16b1e2d3-a0a5-42b6-910a-22250eaa640b
DcJraLH8AUbh4M9pjy8T7utL1Ta2	Иванов Иван Иванович	1970-02-04 11:22:34.674	+7999999999	Мужской	{"клинический осмотр пациента","диагностика и оценка состояния клинической ситуации в соответствии со стандартом медицинской помощи","определяет степень нарушения гемостаза","составляет план терапевтических мероприятий по нормализации данных показателей"}	{Терапевт,Кардиолог}	36	3.0	1100	https://firebasestorage.googleapis.com/v0/b/med-app-5bd03.appspot.com/o/DcJraLH8AUbh4M9pjy8T7utL1Ta2%2F%D1%83%D0%B2%D0%B5%D1%80%D0%B5%D0%BD%D0%BD%D0%BE-%D1%83%D1%81%D0%BC%D0%B5%D1%85%D0%B0%D1%82%D1%8C%D1%81%D1%8F-%D0%BE%D0%BA%D1%82%D0%BE%D1%80%D0%B0-90790678.jpg?alt=media&token=b1ba2aa3-d28f-457c-bf99-d0a8c2740ba1
ccdYXDWCCZUV1QrFpSKbKGWvE172	Сидорова Анна Михайловна	1980-02-06 12:00:02.736	+7999999999	Женский	{эндокринология,"определение уровня сахара крови при помощи глюкометра",помпотерапия}	{Эндокринолог}	24	0	2550	https://firebasestorage.googleapis.com/v0/b/med-app-5bd03.appspot.com/o/ccdYXDWCCZUV1QrFpSKbKGWvE172%2Fwoman-doctor-istock_688101large.jpg?alt=media&token=bc277cfc-e442-4cfc-9d0e-d7549de04592
GcY55LPbQMVakjqpkhMOGxBfYeH3	Михайлова Ирина Викторовна	1969-03-08 12:11:58.035	+7999999999	Женский	{"патологии носа",риниты,"синуситы острые и хронические",ларингиты}	{Лор}	34	0	1490	https://firebasestorage.googleapis.com/v0/b/med-app-5bd03.appspot.com/o/GcY55LPbQMVakjqpkhMOGxBfYeH3%2F118048271_s.jpg?alt=media&token=16b2362b-27b0-4328-9f9e-631b7f52257d
0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1	Петров Виталий Иванович	1969-03-01 11:33:34.831	+7999999999	Мужской	{"амбулаторно-поликлиническая хирургия в полном объеме","выполнение любых хирургических вмешательств","диагностика и лечение новообразований кожи"}	{Онколог,Хирург}	21	3.5	2890	https://firebasestorage.googleapis.com/v0/b/med-app-5bd03.appspot.com/o/0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1%2F1649099042_142954_import-url.jpeg?alt=media&token=a616251b-767e-4f99-aef1-25f86d854867
IsMjy6UIGIQ1k0z6xMNvByDatNI3	Артемова Мария Владимировна	2023-04-01 09:15:43.217	+7999999999	Женский	{"атопический дерматит","угревая болезнь","лечение болезней волос и кожи волосистой части головы"}	{Дерматолог}	14	0	2700	https://firebasestorage.googleapis.com/v0/b/med-app-5bd03.appspot.com/o/IsMjy6UIGIQ1k0z6xMNvByDatNI3%2Fyoung-female-medical-doctor-writing-anamnesis-in-her-folder.jpg?alt=media&token=fd7467b7-30c3-4c8b-8d89-8aabf40e52e7
\.


--
-- Data for Name: DoctorsSchedule; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."DoctorsSchedule" (id, "doctorId", "scheduleStart", "scheduleEnd", "interval", days, weekend) FROM stdin;
9	9nSgU6jVUGSogPD08NNp1JbhIb02	9:00	20:30	30	{}	{6,1,4}
10	DcJraLH8AUbh4M9pjy8T7utL1Ta2	9:00	17:30	60	{}	{6,0}
11	0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1	11:30	17:00	30	{}	{3,5,6}
12	ccdYXDWCCZUV1QrFpSKbKGWvE172	9:00	15:00	15	{}	{0,2,4,6}
13	GcY55LPbQMVakjqpkhMOGxBfYeH3	9:50	20:00	20	{}	{4,6,0}
14	IsMjy6UIGIQ1k0z6xMNvByDatNI3	11:00	18:00	60	{}	{0,1}
\.


--
-- Data for Name: Education; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Education" (id, "doctorId", year, title) FROM stdin;
31	9nSgU6jVUGSogPD08NNp1JbhIb02	1995	Хирург, Московская медицинская академия им. И.М. Сеченование дополнительного профессионального образования "Московская медицинская академия им. И.М. Сеченова
32	DcJraLH8AUbh4M9pjy8T7utL1Ta2	1987	Кардиолог, Онкологический научный центр РАМН
33	DcJraLH8AUbh4M9pjy8T7utL1Ta2	1993	Кардиолог, Московская городская больница №17
34	DcJraLH8AUbh4M9pjy8T7utL1Ta2	1995	Главный врач, Кардиологический реабилитационный центр Переделкино
35	0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1	2012	Хирург, онколог, Клиника Семейная
36	ccdYXDWCCZUV1QrFpSKbKGWvE172	1999	Врач-эндокринолог, Областной диабетологический центр, поликлиника № 3
37	GcY55LPbQMVakjqpkhMOGxBfYeH3	1999	Врач-эндокринолог, Областной диабетологический центр, поликлиника № 3
38	IsMjy6UIGIQ1k0z6xMNvByDatNI3	2013	Врач дерматокосметолог, Клиника Красоты Шари Мармель
\.


--
-- Data for Name: Expirience; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Expirience" (id, "doctorId", year, title) FROM stdin;
11	9nSgU6jVUGSogPD08NNp1JbhIb02	1995	Ординатура по специальности "Хирургия", Карагандинский государственный медицинский институт
12	9nSgU6jVUGSogPD08NNp1JbhIb02	1993	Диплом по специальности "Лечебное дело", Карагандинский государственный медицинский институт
13	DcJraLH8AUbh4M9pjy8T7utL1Ta2	1987	Диплом по специальности "Педиатрия", Среднеазиатский медицинский педиатрический институт
14	DcJraLH8AUbh4M9pjy8T7utL1Ta2	1997	 Аспирантура по специальности "Диагностика и терапия неотложных состояний в клинике внутренних болезней", Первый Московский государственный медицинский университет им. И. М. Сеченова
15	0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1	1998	Диплом по специальности "Лечебное дело (Лечебно-профилактическое дело)", Амурская государственная медицинская академия
16	0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1	2000	Ординатура по специальности "Хирургия", 1 городская клиническая больница, г. Благовещенск
17	0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1	2005	Аспирантура по специальности "Хирургия", Российский научный центр хирургии имени академика Б.В. Петровского
18	0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1	2015	Интернатура по специальности "Онкология", Научно-исследовательский онкологический институт им. Герцена
19	ccdYXDWCCZUV1QrFpSKbKGWvE172	1998	Диплом по специальности "Лечебное дело", Смоленская государственная медицинская академия
20	ccdYXDWCCZUV1QrFpSKbKGWvE172	1999	Интернатура по специальности "Терапия", Клиническая больница № 1
21	GcY55LPbQMVakjqpkhMOGxBfYeH3	1999	Интернатура по специальности "Терапия", Клиническая больница № 1
22	GcY55LPbQMVakjqpkhMOGxBfYeH3	1998	Диплом по специальности "Лечебное дело", Смоленская государственная медицинская академия
23	IsMjy6UIGIQ1k0z6xMNvByDatNI3	2009	Диплом по специальности "Лечебное дело", Одесский государственный медицинский университет.
24	IsMjy6UIGIQ1k0z6xMNvByDatNI3	2010	Ординатура по специальности "Дерматовенерология", Российская медицинская академия последипломного образования, кафедра дерматовенерологии, микологии и косметологии
\.


--
-- Data for Name: Favourites; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Favourites" (id, "patientId", "doctorId", "doctorName", "doctorPhoto", "doctorSpeciality") FROM stdin;
\.


--
-- Data for Name: Medcard_Access; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Medcard_Access" (id, "doctorId", "patientId", deadline) FROM stdin;
\.


--
-- Data for Name: Medcard_Record; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Medcard_Record" (id, "patientId", type, photos, title, subtitle, date) FROM stdin;
6577d331-75f2-45b5-9682-881ecd7329e4	ZbatmR0zLNMXNePSKExtr69ChW03	appointment	{https://firebasestorage.googleapis.com/v0/b/med-app-5bd03.appspot.com/o/ZbatmR0zLNMXNePSKExtr69ChW03%2F6577d331-75f2-45b5-9682-881ecd7329e4%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA.PNG?alt=media&token=ac615f5c-56a2-41d2-bda4-6befa431eed0}	тест	клиника тестов	2023-04-01 09:58:16.182
\.


--
-- Data for Name: Patient; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Patient" (uid, name, email, "birthDate", phone, sex, "photoUrl") FROM stdin;
4L0bDT0ZsSchhPsTMwJv3i7FWA22	Вика Вахонина	vika@gmail.com	2023-03-13 18:16:15.035	+79996323140	Женский	\N
ZbatmR0zLNMXNePSKExtr69ChW03	Влад Грицавка	vlad@gmail.com	2023-04-01 17:20:22.471	+79182340070	Мужской	
cY3DebtwtBTM7h4XR0DzWF2oAmx1	Виталий Витальев	vitya@gmail.com	2000-02-02 08:06:55.409	+7999999999	Мужской	
\.


--
-- Data for Name: Reviews; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Reviews" (id, "doctorId", "patientId", text, rating, date) FROM stdin;
21	9nSgU6jVUGSogPD08NNp1JbhIb02	ZbatmR0zLNMXNePSKExtr69ChW03	Понравилось!	5	2023-04-26 14:00:00
22	DcJraLH8AUbh4M9pjy8T7utL1Ta2	ZbatmR0zLNMXNePSKExtr69ChW03	не помог....	3	2023-04-26 14:00:00
23	9nSgU6jVUGSogPD08NNp1JbhIb02	cY3DebtwtBTM7h4XR0DzWF2oAmx1	хорошо, но не идеально...	4	2023-04-28 07:00:00
24	0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1	cY3DebtwtBTM7h4XR0DzWF2oAmx1	не понравилось...	2	2023-04-27 11:00:00
26	0JO3IXHAQdRTo0w4Yhm4EU0ZWUx1	ZbatmR0zLNMXNePSKExtr69ChW03	врач очень хороший, помог!	5	2023-04-27 11:30:00
\.


--
-- Name: Appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Appointments_id_seq"', 36, true);


--
-- Name: DoctorsSchedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."DoctorsSchedule_id_seq"', 14, true);


--
-- Name: Education_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Education_id_seq"', 38, true);


--
-- Name: Expirience_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Expirience_id_seq"', 24, true);


--
-- Name: Favourites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Favourites_id_seq"', 1, false);


--
-- Name: Medcard_Access_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Medcard_Access_id_seq"', 20, true);


--
-- Name: Reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Reviews_id_seq"', 26, true);


--
-- Name: Appointments_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Appointments_id_key" ON public."Appointments" USING btree (id);


--
-- Name: DoctorsSchedule_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "DoctorsSchedule_id_key" ON public."DoctorsSchedule" USING btree (id);


--
-- Name: Doctors_uid_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Doctors_uid_key" ON public."Doctors" USING btree (uid);


--
-- Name: Education_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Education_id_key" ON public."Education" USING btree (id);


--
-- Name: Expirience_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Expirience_id_key" ON public."Expirience" USING btree (id);


--
-- Name: Favourites_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Favourites_id_key" ON public."Favourites" USING btree (id);


--
-- Name: Medcard_Access_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Medcard_Access_id_key" ON public."Medcard_Access" USING btree (id);


--
-- Name: Medcard_Record_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Medcard_Record_id_key" ON public."Medcard_Record" USING btree (id);


--
-- Name: Patient_uid_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Patient_uid_key" ON public."Patient" USING btree (uid);


--
-- Name: Reviews_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Reviews_id_key" ON public."Reviews" USING btree (id);


--
-- Name: Appointments Appointments_doctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Appointments"
    ADD CONSTRAINT "Appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES public."Doctors"(uid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Appointments Appointments_patientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Appointments"
    ADD CONSTRAINT "Appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES public."Patient"(uid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DoctorsSchedule DoctorsSchedule_doctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."DoctorsSchedule"
    ADD CONSTRAINT "DoctorsSchedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES public."Doctors"(uid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Education Education_doctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Education"
    ADD CONSTRAINT "Education_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES public."Doctors"(uid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Expirience Expirience_doctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Expirience"
    ADD CONSTRAINT "Expirience_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES public."Doctors"(uid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Favourites Favourites_patientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Favourites"
    ADD CONSTRAINT "Favourites_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES public."Patient"(uid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Medcard_Access Medcard_Access_doctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Medcard_Access"
    ADD CONSTRAINT "Medcard_Access_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES public."Doctors"(uid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Medcard_Access Medcard_Access_patientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Medcard_Access"
    ADD CONSTRAINT "Medcard_Access_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES public."Patient"(uid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Medcard_Record Medcard_Record_patientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Medcard_Record"
    ADD CONSTRAINT "Medcard_Record_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES public."Patient"(uid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reviews Reviews_doctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES public."Doctors"(uid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reviews Reviews_patientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES public."Patient"(uid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

